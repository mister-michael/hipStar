import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";
import CommentCard from "./CommentCard"

const Comment = (props) => {

    const [mvid, setMvid] = useState([]);
    const [comments, setComments] = useState([]);

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
                        setComments(matchedComments)
                    })
            })
    };


    useEffect(() => {
        findMovieIdGetComments();
    }, [])

    return (
        <div id="" className=" ">
            {comments.map(res => <CommentCard key={res.id} comments={comments} movieId={res.movieId} result={res} userId={res.userId}{...props} />)}
        </div>

    )
}

export default Comment;