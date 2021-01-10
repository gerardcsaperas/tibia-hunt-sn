import React from 'react'
import "./Logo.css";
import { NavLink } from "react-router-dom";

function Logo() {
    return (
        <div className="logoContainer">

            <div className="chainsLeft">
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
            </div>

            <img className="logo" src="../images/logo3-HD.jpg" alt="logo"></img>

            <div className="chainsRight">
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
                <img className="chain" src="../images/chain.gif" alt="chain"></img>
            </div>
            
        </div>
    )
}

export default Logo
