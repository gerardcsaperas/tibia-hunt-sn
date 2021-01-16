import React from 'react'
import "./MyNavBar.css";
import { NavLink } from "react-router-dom";

import { useSelector } from 'react-redux'
import { selectUser } from '../user/userSlice'


function MyNavBar() {

    const user = useSelector(selectUser);
    const { authenticated } = user;
    
    return (
      
        <div id="navbar">

            <div className="section">
                <NavLink to="/profile"><i className="fas fa-user"></i>Profile</NavLink>
            </div>

            {
                authenticated &&
                <div className="section">
                <h5 className="/notifications"><i className="fas fa-bell"></i>Notifications</h5>
                </div>   
            }
            
            {
                authenticated &&
                <div className="section">
                    <NavLink to="/new_record"><i className="fas fa-plus-circle"></i>New Record</NavLink>      
                </div>
            }

            <div className="section">
                <NavLink to="/all-records"><i className="fas fa-dragon"></i>Hunting Records</NavLink>  
            </div>

            <div className="contact">
                <NavLink to="/contact"><i class="far fa-address-book"></i>Contact</NavLink>  
            </div>

        </div>
    )
}

export default MyNavBar
