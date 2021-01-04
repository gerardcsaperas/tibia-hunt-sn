import React from 'react';
import "./styles/HomePage.css";




function HomePage() {
    return (
        <div id="home">
            <div className="title">
                <h3>Tibia Hunting Records</h3>   
            </div>
              <div className="contentBackground">
                <div className="content">
                  <div className="text">
                    <p className="lore">Dear tibians,</p>
                    <p className="lore">Welcome to Tibia Hunting Records, a platform that has been created with a clear idea: Solve the where to go problem.</p>
                    <p className="lore">We want to invite you to join this wonderful community and together build the biggest data base for hunting spots ever!</p>    
                    <p className="lore">Join us in this exciting quest and share your best achievents in this wonderful game called tibia!</p>
                  </div>
                  <div className="buttons">
                    <button className="button">Create an account</button>
                    <button className="button">Hunting Records</button>
                  </div>    
                </div>
            </div>
        </div>
    )
}

export default HomePage

