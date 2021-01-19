import React, { useState, useEffect } from 'react'
import axios from "axios";
import { API_URL } from "../../../config";
import LikeButtons from '../LikeButtons/LikeButtons'
import './CommentBoxToDisplay.scss';
import StarRatings from 'react-star-ratings';

// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../../user/userSlice'

function CommentBoxToDisplay(props) {

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

    const { id, comment, createdAt, isOp, likes, dislikes } = props
    const { username, stars } = props.user;

    const patchLikes = async () => {
        try {
          const config = {
              headers: {
                  'Authorization': `Bearer ${user.token}`
              }
          };

          const body = likesDislikes
          
          await axios.put(`${API_URL}/comment/${id}`, body, config);          

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
  
          patchLikes()
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

        patchLikes()
    }

    return (
        <div id="comBoxDisplay">
            <div className="headLine">
                <p>{createdAt}</p>
            </div>

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
