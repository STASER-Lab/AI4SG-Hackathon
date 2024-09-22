import { useState, useEffect } from 'react'
import Map from './component/Map'
import Loader from './component/Loader'
import Header from './component/Header'

function App() {
 
 // State to hold event data and loading state
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)

// Fetch event data from NASA EONET API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true) // Set loading to true while fetching data
      const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
      const { events } = await res.json()

      setEventData(events);  // Store fetched event data
      setLoading(false);  // Set loading to false once data is fetched
    }

    fetchEvents()
  }, [])

  // Render header, loader or map based on loading state
  return (
    <div>
      <Header />
      { !loading ? <Map eventData={eventData} /> : <Loader /> }
    </div>
  );
}

export default App;
