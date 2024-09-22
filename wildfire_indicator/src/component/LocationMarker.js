import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/fire-alert'
//Represents a marker on the map for each wildfire event. Clicking the marker shows event details.
const LocationMarker = ({ lat, lng, onClick }) => {
    return (
        <div className="location-marker" onClick={onClick}>
            <Icon icon={locationIcon} className="location-icon" />
        </div>
    )
}

export default LocationMarker
