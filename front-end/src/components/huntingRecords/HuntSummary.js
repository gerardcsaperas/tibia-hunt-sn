import React from 'react';
import {Link} from 'react-router-dom';
import './HuntSummary.css';





function HuntSummary(props) {

    if (!props.data) {
         return null;
    }
    

    console.log(props.data)

    return (
            <Link>
                <div className="recordSummary">
                        <div className="lootPicContainer">
                            <img className="lootPicture" src="/assets/tibia-background-artwork.jpg" alt="defaultImg"></img>
                        </div>
    
                        <div className="basicInfo" >
                            <h1 className="location">{`${props.spot.name}, ${props.spot.city}`}</h1>
                            <div className="details">
                                <p className="charInfo">{`${props.teamComp.name}, ${props.teamComp.level} ${props.teamComp.vocation}`}</p>
                                <p className="info">Exp/h: {`${props.expH}`}</p>
                                <p className="expRatio">Exp Ratio: {`${props.expRatio}`}</p>
                                <p className="info">Profit/h: {`${props.profitH}`}</p>
                            </div>
                        <div className="socialMedia">
                            <i class="far fa-thumbs-up"> {`${props.likes.length}`}</i>
                            <i class="far fa-thumbs-down"> {`${props.dislikes.length}`}</i>
                            <i class="far fa-comment"> {`${props.comments.length}`}</i>
                        </div>
                        
                        </div>
                </div>
            </Link>
    )
}

export default HuntSummary
