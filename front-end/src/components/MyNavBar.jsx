import React from 'react'
import "./styles/MyNavBar.css";



function MyNavBar() {
    return (
        <div id="navbar">
            <div id="navbar__left-box">
                <h5 className="profile">Profile</h5>
                <h5 className="notifications">Notifications</h5>
            </div>
            <h2 className="brand">Tibia Hunting Records</h2>
            <div id="navbar__right-box">
                <h5 className="newRecord">New Record</h5>
                <h5 className="huntingRecords">Hunting Records</h5>
            </div>
        </div>
    )
}

export default MyNavBar
