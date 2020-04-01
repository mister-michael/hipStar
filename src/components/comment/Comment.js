import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";
import CommentCard from "./CommentCard"

const Comment = (props) => {

    const [mvid, setMvid] = useState([]);
    const [comments, setComments] = useState([]);
    const [isPink, setIsPink] = useState(true);
    const [didUserComment, setDidUserComment] = useState(false);
    const [userCommentId, setUserCommentId] = useState([]);

    const mdbId = props.mdbId

    const findMovieIdGetComments = () => {
        jAPI.get("movies")
            .then(movies => {
                const matchedMovie = movies.find(movie => movie.dbid === mdbId);
                const mvidHolder = matchedMovie.id;
                jAPI.expand("comments", "user")
                    .then(comments => {
                        console.log(comments, "fetched comments")
                        const matchedComments = comments.filter(comment => comment.movieId === mvidHolder);
                        const matchedToActiveUser =  matchedComments.filter(comment => comment.userId === props.activeUserId);
                        setComments(matchedComments)
                        if (matchedToActiveUser !== undefined) {
                            setDidUserComment(true)
                            setUserCommentId(matchedToActiveUser[0].id)
                        }
                        
                    });
            });
    };


    useEffect(() => {
        findMovieIdGetComments();
    }, [])

    return (
        <div id="" className="">
            <div className="scrollBox">
                {comments.map(res =>
                    <CommentCard
                        key={res.id}
                        commentId={res.id}
                        movieId={res.movieId}
                        result={res}
                        userId={res.userId}
                        isPink={isPink}
                        setIsPink={setIsPink}
                        activeUserId={props.activeUserId}
                        comment={res.comment}
                        findMovieIdGetComments={findMovieIdGetComments}
                        didUserComment={didUserComment}
                        setDidUserComment={setDidUserComment}
                        userCommentId={userCommentId}
                        {...props} />)}
            </div>
        </div>

    )
}

export default Comment;