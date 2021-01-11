import React from 'react';
import {Link} from 'react-router-dom';
import './HuntSummary.css';





function HuntSummary(props) {

    if (!props.data) {
         return null;
    }
    
    const { huntPicture, spot, teamComp, expH, expRatio, profitH, likes, dislikes, comments } = props.data

    return (
            <Link to="/record-details">
                <div className="recordSummary">
                        <div className="lootPicContainer">
                            <img className="lootPicture" src={`${huntPicture}`} alt="defaultImg"></img>
                        </div>
    
                        <div className="basicInfo" >
                            <h1 className="location">{`${spot.name}, ${spot.city}`}</h1>
                            <div className="details">
                                <p className="charInfo">{`${teamComp.name}, ${teamComp.level} ${teamComp.vocation}`}</p>
                                <p className="info">Exp/h: {`${expH}`}</p>
                                <p className="expRatio">Exp Ratio: {`${expRatio}`}</p>
                                <p className="info">Profit/h: {`${profitH}`}</p>
                            </div>

                            <div className="socialMedia">
                                <i class="far fa-thumbs-up"> {`${likes.length}`}</i>
                                <i class="far fa-thumbs-down"> {`${dislikes.length}`}</i>
                                <i class="far fa-comment"> {`${comments.length}`}</i>
                            </div>
                        
                        </div>
                </div>
            </Link>
    )
}

export default HuntSummary
