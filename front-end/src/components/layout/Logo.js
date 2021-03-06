import React from 'react'
import "./Logo.css";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <div className="logoContainer">
            <div className="logo__box">
                <div className="chainsLeft">
                    <img className="chain" src="../images/chain.gif" alt="chain"></img>
                    <img className="chain" src="../images/chain.gif" alt="chain"></img>
                    <img className="chain" src="../images/chain.gif" alt="chain"></img>
                    <img className="chain" src="../images/chain.gif" alt="chain"></img>
                    <img className="chain" src="../images/chain.gif" alt="chain"></img>
                    <img className="chain" src="../images/chain.gif" alt="chain"></img>
                    <img className="chain" src="../images/chain.gif" alt="chain"></img>
                </div>
                <Link to="/all-records">
                    <img className="logo" src="../images/logo-definitiu-HD.jpg" alt="logo"></img>
                </Link>
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
        </div>
    )
}

export default Logo
