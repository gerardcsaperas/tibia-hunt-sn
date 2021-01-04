import React from 'react'
import "./styles/MyNavBar.css";



function MyNavBar() {
    return (
        <div id="navbar">
            <h5 className="profile">Profile</h5>
            <h5 className="notifications">Notifications</h5>
            <h3 className="brand">Tibia Hunting Records</h3>
            <h5 className="newRecord">New Record</h5>
            <h5 className="huntingRecords">Hunting Records</h5>
        </div>
    )
}

export default MyNavBar
