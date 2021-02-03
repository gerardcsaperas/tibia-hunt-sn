import React from "react";
import { Link } from "react-router-dom";
import "./HuntSummary.scss";
import LikeButtons from "../custom/LikeButtons/LikeButtons.jsx";
import NumberFormat from "react-number-format";
// Redux
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";

function HuntSummary(props) {
    const { uid } = useSelector(selectUser);

    if (!props.data) {
        return null;
    }

    const {
        huntPicture,
        spot,
        teamComp,
        expH,
        expRatio,
        profitH,
        likes,
        dislikes,
        comments,
        _id,
    } = props.data;

    return (
        <Link to={`/record-details/${_id}`}>
            <div className="recordSummary">
                <div className="lootPicContainer">
                    <img
                        className="lootPicture"
                        src={
                            huntPicture
                                ? huntPicture
                                : "/images/default_loot.jpg"
                        }
                        alt="defaultImg"
                    ></img>
                </div>

                <div className="basicInfo">
                    <h1 className="location">
                        {spot ? `${spot.name}, ${spot.city}` : "Undefined"}
                    </h1>
                    <div className="details">
                        <p className="charInfo">
                            {teamComp && teamComp[0]
                                ? `Level ${teamComp[0].level}, ${teamComp[0].vocation}`
                                : `Level undefined, undefined`}
                        </p>
                        <NumberFormat
                            value={expH}
                            thousandSeparator={true}
                            displayType="text"
                            suffix=" exp/h"
                        />
                        <p className="expRatio">
                            Exp Ratio: {`${expRatio}` * 100 + "%"}
                        </p>
                        <NumberFormat
                            value={profitH}
                            thousandSeparator={true}
                            displayType="text"
                            suffix=" gp/h"
                        />
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
    );
}

export default HuntSummary;
