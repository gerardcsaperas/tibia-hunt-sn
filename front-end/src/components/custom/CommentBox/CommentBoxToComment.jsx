import React, { useState } from 'react'
import axios from "axios";
import { API_URL } from "../../../config";
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import './CommentBoxToComment.scss';

// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../../user/userSlice'

function CommentBoxToComment(props) {

    const user = useSelector(selectUser);
    const { username, stars, uid } = user
    let { recordID }  = useParams();
    const [ text, setText ] = useState();
    if (!props) {
        return null;
    }

    const postComment = async () => {

        if (!text || text === '') {
            return
        }

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };
  
            const body = {
                text
            }
            
            const response = await axios.post(`${API_URL}/comment/${recordID}`, body, config);          
            if (response.status === 201) {
                window.location.reload()
            }
            
        } catch(e) {
              console.error(e);
        }
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
                    <textarea onChange={(e) => setText(e.target.value)} placeholder="Add a comment"></textarea>
                    <button onClick={postComment}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CommentBoxToComment
    