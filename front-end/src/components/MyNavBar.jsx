import React from 'react'
import "./styles/MyNavBar.css";
import { NavLink } from "react-router-dom";



function MyNavBar() {
    return (
        <div id="navbar">
            <div id="navbar__left-box">
                <NavLink to="/profile"><i className="fas fa-user"></i>Profile</NavLink>
                <h5 className="/notifications"><i className="fas fa-bell"></i>Notifications</h5>
            </div>
            <h2 className="brand">Tibia Hunting Records</h2>
            <div id="navbar__right-box">
                <NavLink to="/new_record"><i className="fas fa-plus-circle"></i>New Record</NavLink>
                <NavLink to="/hunting-record"><i className="fas fa-dragon"></i>Hunting Records</NavLink>
            </div>
        </div>
    )
}

export default MyNavBar
