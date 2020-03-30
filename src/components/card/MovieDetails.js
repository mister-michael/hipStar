import React, { useState, useEffect } from "react";
import mAPI from "../../modules/movieManager"
import jAPI from "../../modules/apiManager"
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader
} from 'reactstrap';

const MovieDetails = props => {

    const [movieFromDb, setMovieFromDb] = useState([]);
    const [poster, setPoster] = useState([]);
    const [jsonId, setJsonId] = useState([]);

    // let poster = "https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d23c71b5970c-800wi";

    const movieId = parseInt(props.movieId)
    console.log(props.movieId)



    const getMovieJson = () => {
        mAPI.searchWithId(movieId)
            .then(movieFromTmdb => {
                console.log(movieFromTmdb)
                setMovieFromDb(movieFromTmdb)
                setPoster(imageHandler(movieFromTmdb))

                jAPI.get("movies")
                    .then(movies => {

                        const movieInJson = movies.find(movie => movie.dbid === movieId);
                        if (movieInJson !== undefined) {
                            setJsonId(movieInJson.id)
                        } else {
                            const movieObject = {
                                dbid: movieFromTmdb.id,
                                title: movieFromTmdb.title,
                                releaseDate: movieFromTmdb.release_date,
                                posterPath: imageHandler(movieFromTmdb),
                                revenue: movieFromTmdb.revenue,
                                overview: movieFromTmdb.overview,
                                tagline: movieFromTmdb.tagline
                            };
                            jAPI.save(movieObject, "movies")
                                .then(savedMovie => setJsonId(savedMovie.id))
                        }

                    })
            });
    }

    const handleClick = (e) => {
       const idForPatch = e.target.id.split("--")[1];
       const buttonName = e.target.innerHTML.toLowerCase();
       console.log(buttonName, "buttonName");
       console.log(idForPatch, "idforpatch")
        //  if (buttonName === "love")
    };

    const imageHandler = (movie) => {
        const posterPath = "poster_path";
        if (movie[posterPath] !== null) {

            return `https://image.tmdb.org/t/p/w500${movie[posterPath]}`;
        } else {
            return poster;
        };
    };

    useEffect(() => {
        getMovieJson();
    }, [])

    return (
        <>
            <div className="">
                <CardImg id="" top src={poster} alt={`${movieFromDb.title} poster`} className="cardImage" />
                <CardTitle>{movieFromDb.title}</CardTitle>
                {/* <CardSubtitle>{release()}</CardSubtitle> */}
                <CardBody >
                    <div>{movieFromDb.overview}</div>
                    <div className="buttonRow">
                        <button
                            id={`hate-button--${jsonId}`}
                            onClick={(e) => handleClick(e)}
                        // className={hateBtnState.name}
                        // disabled={isHateDisabled}
                        >
                            Hate</button>
                        <button
                            id={`love-button--${jsonId}`}
                            onClick={(e) => handleClick(e)}
                        // className={loveBtnState.name}
                        // disabled={isLoveDisabled}
                        >Love</button>{' '}
                        {' '}
                        {/* {forgetJSX()} */}
                    </div>
                </CardBody>
            </div>
        </>
    )

}

export default MovieDetails