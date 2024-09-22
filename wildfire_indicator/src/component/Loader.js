import spinner from './loading.gif'
//Displays a loading spinner when data is being fetched.
const Loader = () => {
  return (
    <div className="loader">
      <img src ={spinner} alt="Loading"/>
        <h2>Getting data from datdabase</h2>
    </div>
  )
}

export default Loader
