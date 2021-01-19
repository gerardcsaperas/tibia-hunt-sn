import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../../user/userSlice'

function LikeButtons(props) {
    
    const { uid } = useSelector(selectUser)

    const { color, likes, dislikes, handleClickLike, handleClickDislike, comments, commentsNum } = props

    const [ likesType, setLikesType ] = useState()
    const [ dislikesType, setDislikesType ] = useState()

    useEffect(() => {
        if (props) {
            likes.indexOf(uid) === -1 ? setLikesType("far") : setLikesType("fas")
            dislikes.indexOf(uid) === -1 ? setDislikesType("far") : setDislikesType("fas")
        }
    }, [props])

    return (
        <div className="socialMedia" id={props.id || null }>
            <i className={`${likesType} fa-thumbs-up`} onClick={handleClickLike} style={{color: color || "black"}}> {`${likes.length}`}</i>
            <i className={`${dislikesType} fa-thumbs-down`} onClick={handleClickDislike} style={{color: color || "black"}}> {`${dislikes.length}`}</i>
            { comments && (<i class="far fa-comment"> {`${commentsNum}`}</i>) }
        </div>
    )
}

export default LikeButtons
