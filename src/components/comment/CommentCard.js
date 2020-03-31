import React from "react";
import "./Comment.css"

const CommentCard = props => {


    return (
        <>
            <div className="commentContainer">
                <div className="usernameBox">{props.result.user.username} says...</div>
            <div className="commentBox">{props.result.comment}</div>
            </div>
        </>
    )
}

export default CommentCard