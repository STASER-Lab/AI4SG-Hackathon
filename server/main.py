from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field, constr
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session

# FastAPI app
app = FastAPI()

# SQLite Database connection
DATABASE_URL = "sqlite:///./recommender.db"

# SQLite-specific configuration (check_same_thread=False)
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Database Models
class Provider(Base):
    __tablename__ = 'providers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    service = Column(String(100), nullable=False)
    location = Column(String(100), nullable=False)

class Client(Base):
    __tablename__ = 'clients'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    need = Column(String(100), nullable=False)
    location = Column(String(100), nullable=False)

class ClientProviderMapping(Base):
    __tablename__ = 'client_provider_mapping'

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey('clients.id', ondelete='CASCADE'), nullable=False)
    provider_id = Column(Integer, ForeignKey('providers.id', ondelete='CASCADE'), nullable=False)
    rating = Column(Integer, nullable=True)  # Add rating (1-5 scale)
    
    client = relationship("Client")
    provider = relationship("Provider")


# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic Models (For Validation and Parsing)
class ProviderCreate(BaseModel):
    name: constr(min_length=1, max_length=100)
    service: constr(min_length=1, max_length=100)
    location: constr(min_length=1, max_length=100)

class ClientCreate(BaseModel):
    name: constr(min_length=1, max_length=100)
    need: constr(min_length=1, max_length=100)
    location: constr(min_length=1, max_length=100)

class ClientProviderMappingCreate(BaseModel):
    client_id: int = Field(..., gt=0)
    provider_id: int = Field(..., gt=0)

# Dependency to get a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API to add a provider
@app.post("/providers/", response_model=ProviderCreate)
def add_provider(provider: ProviderCreate, db: Session = Depends(get_db)):
    new_provider = Provider(**provider.dict())
    db.add(new_provider)
    db.commit()
    db.refresh(new_provider)
    return new_provider

# API to add a client
@app.post("/clients/", response_model=ClientCreate)
def add_client(client: ClientCreate, db: Session = Depends(get_db)):
    new_client = Client(**client.dict())
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client

# API to add a client-provider mapping
@app.post("/client-provider-mapping/", response_model=ClientProviderMappingCreate)
def add_client_provider_mapping(mapping: ClientProviderMappingCreate, db: Session = Depends(get_db)):
    # Check if client and provider exist
    client = db.query(Client).filter(Client.id == mapping.client_id).first()
    provider = db.query(Provider).filter(Provider.id == mapping.provider_id).first()

    if not client or not provider:
        raise HTTPException(status_code=404, detail="Client or Provider not found.")
    
    new_mapping = ClientProviderMapping(**mapping.dict())
    db.add(new_mapping)
    db.commit()
    db.refresh(new_mapping)
    
    return new_mapping

# Basic root endpoint for testing
@app.get("/")
def read_root():
    return {"message": "Welcome to the SQLite-based recommender system API!"}
