import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import jAPI from "../../modules/apiManager";
import CommentCard from "./CommentCard";

const Comment = (props) => {


    const [comments, setComments] = useState([]);
    const [isPink, setIsPink] = useState(true);

    const [review, setReview] = useState({ review: "" });


    const mdbId = props.mdbId

    const findMovieIdGetComments = () => {
        jAPI.get("movies")
            .then(movies => {
                const matchedMovie = movies.find(movie => movie.dbid === mdbId);
                let mvidHolder = "";
                matchedMovie ? mvidHolder = matchedMovie.id : mvidHolder =props.mvid
                props.setMvid(mvidHolder)
                jAPI.expand("comments", "user")
                    .then(comments => {
                        console.log(comments, "fetched comments")
                        const matchedComments = comments.filter(comment => comment.movieId === mvidHolder);
                        const matchedToActiveUser = matchedComments.filter(comment => comment.userId === props.activeUserId);
                        console.log(matchedToActiveUser)
                        setComments(matchedComments.reverse())
                        if (matchedToActiveUser.length > 0) {
                            props.setDidUserComment(true)
                            props.setUserCommentId(matchedToActiveUser[0].id)
                        }

                    });
            });
    };
    const reviewObject = {
        userId: props.activeUserId,
        movieId: props.mvid,
        comment: review.review
    }

    const handleChange = (evt) => {
        const stateToChange = { ...review }
        stateToChange[evt.target.id] = evt.target.value;
        setReview(stateToChange);
    }

    const targetInput = document.getElementById("review")

    const saveReview = (evt) => {
        jAPI.save(reviewObject, "comments")
            .then(() => {
                props.setRefresh(!props.refresh);
                props.setDidUserComment(true)
                targetInput.value = ""
            }
            );
    };




    useEffect(() => {
        findMovieIdGetComments();
    }, [props.refresh])

    return (
        <div id="" className="">
            <Button
                className="buttonMarginBottom reviewButtonColor"
                onClick={saveReview}>
                review
                </Button>
            <Input
                type="textarea"
                placeholder="hit review to publish review"
                name="text"
                id="review"
                onChange={handleChange}
                onKeyUp={e => e.key === "Enter" ? saveReview(e) : null}
                className="profileMarginBottom"
            />
            <div className="scrollBox">
                {comments.map(res => {
                    if (props.didUserComment) {
                        return (
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
                                didUserComment={props.didUserComment}
                                setDidUserComment={props.setDidUserComment}
                                userCommentId={props.userCommentId}
                                setUserCommentId={props.setUserCommentId}
                                {...props} />)
                    }

                }
                )}
            </div>

        </div >

    )
}

export default Comment;