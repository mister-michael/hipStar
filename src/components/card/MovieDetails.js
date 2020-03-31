import React, { useState, useEffect } from "react";
import mAPI from "../../modules/movieManager"
import jAPI from "../../modules/apiManager"
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

const MovieDetails = props => {

    const [movieFromDb, setMovieFromDb] = useState([]);
    const [poster, setPoster] = useState([]);
    const [jsonId, setJsonId] = useState([]);
    const [isRated, setIsRated] = useState([]);
    const [loveHateFoundId, setLoveHateFoundId] = useState([])

    // let poster = "https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d23c71b5970c-800wi";

    const activeUserId = parseInt(sessionStorage.getItem("userId"))
    const movieId = parseInt(props.movieId)
    console.log(props.mdbId)


    const isMovieRated = () => {
        jAPI.userMovieExpand("loveHates", activeUserId)
            .then(lhs => {
                console.log(lhs, "user in isRated")
                const lhsIsRated = lhs.filter(lh => lh.movieId === jsonId)
                console.log(lhsIsRated, "lhsIsRated")
                if (lhsIsRated !== undefined) {
                    console.log("lh.movieId === jsonId")
                    setIsRated(true);
                    console.log(lhsIsRated.id, "lhsIsRated.id")
                    setLoveHateFoundId(lhsIsRated.id)
                } else {
                    console.log("lh.movieId !== jsonId")
                    setIsRated(false);
                }

            });
    };
    const getMovieJson = () => {
        mAPI.searchWithId(movieId)
            .then(movieFromTmdb => {
                console.log(movieFromTmdb)
                setMovieFromDb(movieFromTmdb)
                setPoster(imageHandler(movieFromTmdb))

                jAPI.get("movies")
                    .then(movies => {

                        const movieInJson = movies.find(movie => movie.dbid === movieId);
                        console.log(movieInJson, "movieINJson")
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
                                .then(savedMovie => {
                                    console.log(savedMovie, "savedMovie")
                                    setJsonId(savedMovie.id)
                                })
                        }
                        isMovieRated();
                    });
            });
    };



    const handleClick = (e) => {
        const buttonName = e.target.innerHTML.toLowerCase();
        let patchBool = ""
        buttonName === "hate" ? patchBool = true : patchBool = false;
        console.log(buttonName, "buttonName");
        if (isRated === true) {
            console.log("inside patch")
            console.log(patchBool)
            const toggleIsHated = { isHated: patchBool }
            jAPI.patch(toggleIsHated, "loveHates", loveHateFoundId)
            isMovieRated();
        } else if (isRated == false) {
            const loveHateObject = {
                userId: activeUserId,
                movieId: jsonId,
                isHated: patchBool
            }
            jAPI.save(loveHateObject, "lovehates")
            setIsRated(true);
        }
    };

    const imageHandler = (movie) => {
        const posterPath = "poster_path";
        if (movie[posterPath] !== null) {
            return `https://image.tmdb.org/t/p/w500${movie[posterPath]}`;
        } else {
            return poster;
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
            <div className="">
                <CardImg id="" top src={poster} alt={`${movieFromDb.title} poster`} className="cardImage" />
                <CardTitle>{movieFromDb.title}</CardTitle>
                {/* <CardSubtitle>{release()}</CardSubtitle> */}
                <CardBody >
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
        </>
    )

}

export default MovieDetails