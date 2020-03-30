import React, { useState, useEffect } from "react";
import mAPI from "../../modules/movieManager"
import jAPI from "../../modules/apiManager"
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader
} from 'reactstrap';

const MovieDetails = props => {

    const [movieFromDb, setMovieFromDb] = useState([]);

    let poster = "https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d23c71b5970c-800wi";

    const movieId = parseInt(props.movieId)
    console.log(props.movieId)

    const getMovieByDbid = () => {
        jAPI.getWithId("movies", movieId)
            .then(movie => {
                console.log(movie)
                setMovieFromDb(movie)
            });
    }

    // const imageHandler = () => {
    //     if (movieFromDb.posterPath !== null) {
    //         return `https://image.tmdb.org/t/p/w500${movieFromDb.posterPath}`;
    //     } else {
    //         return poster;
    //     };
    // };

    const handleClick = (e) => {
        console.log(e, "eeeeeee")
    }

    useEffect(() => {
        getMovieByDbid();
    }, [])

    return (
        <>
            <div className="">
                <CardImg id="" top src={movieFromDb.posterPath} alt={`${movieFromDb.title} poster`} className="cardImage" />
                <CardTitle>{movieFromDb.title}</CardTitle>
                {/* <CardSubtitle>{release()}</CardSubtitle> */}
                <CardBody >
                    <div>{movieFromDb.overview}</div>
                    <div className="buttonRow">
                        <button
                            id={`hate-button--${movieFromDb.id}`}
                            onClick={(e) => handleClick(e)}
                            // className={hateBtnState.name}
                            // disabled={isHateDisabled}
                            >
                            <span>Hate</span></button>
                        <button
                            id={`love-button--${movieFromDb.id}`}
                            onClick={(e) => handleClick(e)}
                            // className={loveBtnState.name}
                            // disabled={isLoveDisabled}
                            ><span >Love</span></button>{' '}
                        {' '}
                        {/* {forgetJSX()} */}
                    </div>
                </CardBody>
            </div>
        </>
    )

}

export default MovieDetails