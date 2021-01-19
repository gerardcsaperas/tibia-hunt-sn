import React from 'react'
import axios from "axios";
import { API_URL } from "../../../config";
import StarRatings from 'react-star-ratings';
import './CommentBoxToComment.scss';

// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../../user/userSlice'

function CommentBoxToComment(props) {

    const user = useSelector(selectUser);
    const { username, stars, uid } = user

    if (!props) {
        return null;
    }

    const postComment = () => {
      console.log('post')
    }

    return (
        <div id="comBoxComment">
            <div className="headLine"></div>
            <div className="commentContent">
                <div className="leftData">
                    <div>
                        <p className="username">{username}</p>
                        <StarRatings
                        rating={stars}
                        starDimension="20px"
                        starSpacing="1px"
                        starRatedColor="gold"
                        />
                    </div>
                </div>
                <div className="rightData">
                    <textarea placeholder="Add a comment"></textarea>
                    <button onClick={postComment}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CommentBoxToComment
    