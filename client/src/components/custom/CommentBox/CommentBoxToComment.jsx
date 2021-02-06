import React, { useState } from 'react'
import axios from "axios";
import { API_URL } from "../../../config";
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import './CommentBoxToComment.scss';

// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../../user/userSlice'
import { selectViewport } from '../../layout/viewportSlice'

function CommentBoxToComment(props) {
    const { width } = useSelector(selectViewport);
    const user = useSelector(selectUser);
    const { username, stars } = user
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
            if (response.status === 201 && response.data) {
                const notificationBody = {
                    receiver: props.receiver,
                    notificationType: 'comment',
                    notificationReference: props.notificationReference,
                    notificationOrigin: 'huntingRecord'                    
                }
                await axios.post(`${API_URL}/notification`, notificationBody, config);
                window.location.reload()
            }
            
        } catch(e) {
              console.error(e);
        }
    }

    return (
        <div className="CommentBox">
            <div className="commentContent">
                <div className="leftData">
                    <p className="username">{username}</p>
                    <StarRatings
                        rating={stars}
                        starDimension={ width > 600 ? "20px" : "10px" }
                        starSpacing="1px"
                        starRatedColor="gold"
                    />
                </div>
                <div className="rightData">
                    <textarea onChange={(e) => setText(e.target.value)} placeholder="Add a comment"></textarea>
                </div>
            </div>
            <div className="button__box">
                <button onClick={postComment}>Post</button>
            </div>
        </div>
    )
}

export default CommentBoxToComment
    