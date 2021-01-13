import React from 'react';
import {Link} from 'react-router-dom';
import './HuntSummary.css';





function HuntSummary(props) {

    if (!props.data) {
         return null;
    }
    console.log(props)

    const { huntPicture, spot, teamComp, expH, expRatio, profitH, likes, dislikes, comments, _id } = props.data

    return (
            <Link to={`/record-details/${_id}`}>
                <div className="recordSummary">
                        <div className="lootPicContainer">
                            <img className="lootPicture" src="/images/default_user.jpg" alt="defaultImg"></img>
                        </div>
    
                        <div className="basicInfo" >
                            <h1 className="location">{`${spot.name}, ${spot.city}`}</h1>
                            <div className="details">
                                <p className="charInfo">{`${teamComp[0].name}, ${teamComp[0].level} ${teamComp[0].vocation}`}</p> 
                                <p className="info">Exp/h: {`${expH}` + "/h"}</p>
                                <p className="expRatio">Exp Ratio: {`${expRatio}`*100 + "%"}</p>
                                <p className="info">Profit/h: {`${profitH}` + "/h"}</p>
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
