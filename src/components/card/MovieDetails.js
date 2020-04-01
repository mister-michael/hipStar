import React, { useState, useEffect } from "react";
import mAPI from "../../modules/movieManager"
import jAPI from "../../modules/apiManager"
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import "./Card.css"

const MovieDetails = props => {

    const [movieFromDb, setMovieFromDb] = useState([]);
    const [poster, setPoster] = useState([]);
    const [jsonId, setJsonId] = useState([]);
    const [isRated, setIsRated] = useState([]);
    const [loveHateFoundId, setLoveHateFoundId] = useState([])

    // let poster = "https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d23c71b5970c-800wi";

    const activeUserId = parseInt(sessionStorage.getItem("userId"))
    const movieId = parseInt(props.mdbId)
    console.log(props.mdbId)




    const getMovieJson = () => {
        mAPI.searchWithId(movieId)
            .then(movieFromTmdb => {
                console.log(movieFromTmdb)
                setMovieFromDb(movieFromTmdb)
                if (movieFromTmdb.poster_path !== null) {
                    setPoster(imageHandler(movieFromTmdb))
                } else {
                    setPoster(imageHandler(movieFromTmdb))
                }
                jAPI.get("movies")
                    .then(movies => {

                        const movieInJson = movies.find(movie => movie.dbid === movieId);
                        console.log(movieInJson, "movieINJson")
                        if (movieInJson !== undefined) {
                            setJsonId(movieInJson.id)
                            setMovieFromDb(movieInJson)
                        } else {
                            console.log()
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
                                .then(savedMovie => {
                                    console.log(savedMovie, "savedMovie");
                                    setJsonId(savedMovie.id);
                                    setMovieFromDb(savedMovie);
                                })
                        }
                    });
            });
    };

    let posterFunction = (int) => {
        const randomN = Math.ceil(Math.random() * int)
        return require(`../img/image-unavailable--${randomN}.jpg`)
    };

    const imageHandler = (movie) => {
        const posterPath = "poster_path";
        if (movie[posterPath] !== null) {
            return `https://image.tmdb.org/t/p/w500${movie[posterPath]}`;
        } else {
            return posterFunction(5);
        };
    };



    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        getMovieJson();

        console.log("isRated =", isRated)
    }, [])

    return (
        <>
            <div id={jsonId} className="">
                <div 
                // className="detailsImageAndOverview"
                >
                    <CardImg id="" top src={poster} alt={`${movieFromDb.title} poster`} className="cardImage boxShadow marginTopSmall marginBottomSmall detailsImage" />
                    {/* <CardTitle>{movieFromDb.title}</CardTitle> */}
                    {/* <CardSubtitle>{release()}</CardSubtitle> */}
                    <CardBody className="detailsMarginBottom">
                        <div className="overviewText detailsMarginTop">Overview</div>
                        <div>{movieFromDb.overview}</div>
                        {/* <div className="buttonRow">
                        <button
                            id={`hate-button--${jsonId}`}
                            onClick={(e) => handleClick(e)}
                        className={hateBtnState.name}
                        disabled={isHateDisabled}
                        >
                            Hate</button>
                        <button
                            id={`love-button--${jsonId}`}
                            onClick={(e) => handleClick(e)}
                        className={loveBtnState.name}
                        disabled={isLoveDisabled}
                        >Love</button>{' '}
                        {' '}
                        {forgetJSX()} */}
                        {/* </div> */}
                    </CardBody>
                </div>
            </div>
        </>
    )

}

export default MovieDetails