import React from 'react'
import './CommentBoxToDisplay.css';




function CommentBoxToDisplay(props) {

    console.log(props)

     if (!props.data) {
         return null;
    }

   const {opComment, createdAt} = props.data


    return (
        <div id="comBoxDisplay">
              <div className="headLine">
                <p>{createdAt}</p>
              </div>

              <div className="commentContent">
                <div className="leftData">
                  <div>
                    {/* <p>{user}</p>
                    <p>{user.rank}</p>
                    <p>{user.posts}</p> */}
                  </div>
                </div>

                <div className="rightData">
                  <p>{opComment}</p>
                  <div className="rating">
                    <i class="far fa-thumbs-up"></i>
                    <p>0</p>
                    <i class="far fa-thumbs-down"></i>
                    <p>0</p>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default CommentBoxToDisplay
