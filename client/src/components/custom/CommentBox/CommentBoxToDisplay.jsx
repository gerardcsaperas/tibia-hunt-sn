import React, { useState, useEffect } from 'react'
import axios from "axios";
import { API_URL } from "../../../config";
import LikeButtons from '../LikeButtons/LikeButtons'
import './CommentBoxToDisplay.scss';
import StarRatings from 'react-star-ratings';

// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../../user/userSlice'
import { selectViewport } from '../../layout/viewportSlice'

function CommentBoxToDisplay(props) {
    const { width } = useSelector(selectViewport);
    const user = useSelector(selectUser);
    const { uid } = user
    const [ likesDislikes, setLikesDislikes ] = useState();

    useEffect(() => {
        setLikesDislikes({
            likes: props.likes || 0,
            dislikes: props.dislikes || 0
        })
    }, [props])

    if (!props) {
        return null;
    }

    const { receiver, notificationReference, id, comment, createdAt, isOp, likes, dislikes } = props
    const { username, stars } = props.user || { username: '(user deleted)', stars: 0 };

    const patchLikes = async (likeOrDislike) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };

            const body = likesDislikes
          
            const response = await axios.put(`${API_URL}/comment/${id}`, body, config);
            if (response.status === 201 && response.data) {

                const notificationBody = {
                    receiver,
                    notificationType: likeOrDislike,
                    notificationReference,
                    notificationOrigin: 'comment'                    
                }

                const postNotification = await axios.post(`${API_URL}/notification`, notificationBody, config);
                return
            }
          
        } catch(e) {
            console.error(e);
        }
    }

    const handleCommentLike = () => {

        let { likes, dislikes } = likesDislikes;

        const uidDislikesIndex = dislikes.indexOf(uid)
        let dislikesArray = dislikes
        uidDislikesIndex !== -1 && (dislikesArray.splice(uidDislikesIndex, 1))

        const uidIndex = likes.indexOf(uid)
        let likesArray = likes
        uidIndex === -1 ? likesArray.push(uid) : likesArray.splice(uidIndex, 1)

        setLikesDislikes({
            ...likesDislikes,
            likes: likesArray,
            dislikes: dislikesArray
        })
  
        patchLikes('like')
    }

    const handleCommentDislike = () => {

        let { likes, dislikes } = likesDislikes;

        const uidIndex = likes.indexOf(uid)
        let likesArray = likes
        uidIndex !== -1 && (likes.splice(uidIndex, 1))

        const uidDislikesIndex = dislikes.indexOf(uid)
        let dislikesArray = dislikes
        uidDislikesIndex === -1 ? dislikesArray.push(uid) : dislikesArray.splice(uidIndex, 1)

        setLikesDislikes({
          ...likesDislikes,
          likes: likesArray,
          dislikes: dislikesArray
        })

        patchLikes('dislike')
    }

    return (
        <div className="CommentBox">
            <div className="date headLine">
                <p>{new Date(createdAt).toString().slice(0,34)}</p>
            </div>

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
                    <p>{comment}</p>
                    <div className="rating">
                        
                        { !isOp && likesDislikes && (
                            <LikeButtons
                            likes={likesDislikes.likes}
                            dislikes={likesDislikes.dislikes}
                            handleClickLike={handleCommentLike}
                            handleClickDislike={handleCommentDislike}
                            comments={false}
                        />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentBoxToDisplay
