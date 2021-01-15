import React from 'react'
import './CommentBoxToComment.css';



function CommentBoxToComment(props) {

    console.log(props)

     if (!props.data) {
         return null;
    }

  //  const {user, user.rank, user.posts} = props.data


    return (
        <div id="comBoxComment">
              <div className="headLine"></div>

              <div className="commentContent">
                <div className="leftData">
                  <div>
                    {/* <p>{user}</p>
                    <p>{user.rank}</p>
                    <p>{user.posts}</p> */}
                  </div>
                </div>

                <div className="rightData">
                  <textarea placeholder="Add a comment"></textarea>
                  <button>Post</button>
                </div>
              </div>
            </div>
    )
}

export default CommentBoxToComment
    