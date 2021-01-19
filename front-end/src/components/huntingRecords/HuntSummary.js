import React from 'react';
import {Link} from 'react-router-dom';
import './HuntSummary.scss';
import LikeButtons from '../custom/LikeButtons/LikeButtons.jsx';
// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../user/userSlice'

function HuntSummary(props) {

    const { uid } = useSelector(selectUser);

    if (!props.data) {
         return null;
    }

    const { huntPicture, spot, teamComp, expH, expRatio, profitH, likes, dislikes, comments, _id } = props.data

    return (
            <Link to={`/record-details/${_id}`}>
                <div className="recordSummary">
                        <div className="lootPicContainer">
                            <img className="lootPicture" src="/images/default_loot.jpg" alt="defaultImg"></img>
                        </div>
    
                        <div className="basicInfo" >
                            <h1 className="location">{`${spot.name}, ${spot.city}`}</h1>
                            <div className="details">
                                <p className="charInfo">{`${teamComp[0].name}, ${teamComp[0].level} ${teamComp[0].vocation}`}</p> 
                                <p className="info">Exp/h: {`${expH}` + "/h"}</p>
                                <p className="expRatio">Exp Ratio: {`${expRatio}`*100 + "%"}</p>
                                <p className="info">Profit/h: {`${profitH}` + "/h"}</p>
                            </div>
                            <LikeButtons
                            likes={likes}
                            dislikes={dislikes}
                            handleClickLike={null}
                            handleClickDislike={null}
                            comments={true}
                            commentsNum={comments.length}
                            />                     
                        </div>
                </div>
            </Link>
    )
}

export default HuntSummary
