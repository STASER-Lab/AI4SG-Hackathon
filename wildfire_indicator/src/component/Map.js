import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'


const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)
   // Create a list of markers for events that have a category ID of 8 (wildfires)
    const markers = eventData.map((ev, index) => {
        if(ev.categories[0].id === 8) {
          // Each marker has latitude, longitude, and an onClick handler to display the location info
            return <LocationMarker  key={index} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => setLocationInfo({ id: ev.id, title: ev.title })} />
        }
        return null // Only create markers for events with a category ID of 8
    })

    return (
        <div className="map">
          {/* Renders the Google Map with specified center, zoom, and markers */}
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAv3iz_lR6Vg0Z-iIHEpGNzmU4kfM2Cw2A' }}
                defaultCenter={ center } // Default center coordinates for the map
                defaultZoom={ zoom } // Default zoom level for the map
                >
                {markers} {/* Display all markers on the map */}
            </GoogleMapReact>
             {/* Displays the location information box when a marker is clicked */}
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    )
}
// Default props for the map's initial center and zoom using kelowna lat and lng
Map.defaultProps = {
    center: {
        lat: 49.8863,
        lng: -119.4966
    },
    zoom: 6
}

export default Map
