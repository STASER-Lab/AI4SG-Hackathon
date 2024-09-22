import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/fire-alert'
//Displays the header of the application with an icon representing wildfires. This is the title section of the app.
const Header = () => {
    return (
        <header className="header">
            <h1><Icon icon={locationIcon} /> Wildfire Tracker</h1>
        </header>
    )
}

export default Header
