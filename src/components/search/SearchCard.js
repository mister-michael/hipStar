import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "./Search.css"
import mAPI from "../../modules/movieManager";
import jAPI from "../../modules/apiManager";
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import MovieDetails from "../card/MovieDetails"

const SearchCard = (props) => {

  const mdbId = props.result.id;
  const activeUserId = props.activeUserId;

  let poster = "https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d23c71b5970c-800wi";

  let loveHateFoundId = ""

  const [loveBtnState, setLoveBtnState] = useState({ name: "" });
  const [hateBtnState, setHateBtnState] = useState({ name: "" });
  const [loveHateId, setLoveHateId] = useState(false);
  const [isLoveDisabled, setIsLoveDisabled] = useState(true);
  const [isHateDisabled, setIsHateDisabled] = useState(true);
  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const buttons = () => {
    jAPI.userMovieExpand("loveHates", activeUserId)
      .then(movies => {
        if (movies.length > 0) {
          for (let i = 0; i < movies.length; i++) {
            if (mdbId === movies[i].movie.dbid && movies[i].isHated === true) {
              loveHateFoundId = movies[i].id;
              setHateBtnState({ name: "hatedBtn" });
              setLoveBtnState({ name: "unlovedBtn" });
              setLoveHateId(loveHateFoundId);
              setIsLoveDisabled(false);
              setIsHateDisabled(true);

              break
            } else if (mdbId === movies[i].movie.dbid && movies[i].isHated === false) {
              loveHateFoundId = movies[i].id;
              setHateBtnState({ name: "unhatedBtn" });
              setLoveBtnState({ name: "lovedBtn" });
              setLoveHateId(loveHateFoundId);
              setIsLoveDisabled(true);
              setIsHateDisabled(false);

              break
            } else {
              setHateBtnState({ name: "unhatedBtn" });
              setLoveBtnState({ name: "unlovedBtn" });
              setIsLoveDisabled(false);
              setIsHateDisabled(false);
            }
          }
        } else {
          setHateBtnState({ name: "unhatedBtn" });
          setLoveBtnState({ name: "unlovedBtn" });
          setIsLoveDisabled(false);
          setIsHateDisabled(false);
        }
      })
  }


  const handleClick = (e) => {

    console.log(e.target.innerHTML)
    let patchBool = ""
    let loveDisabledBool = ""
    let hateDisabledBool = ""
    let hateClass = ""
    let loveClass = ""

    if (e.target.innerHTML === "Hate") {
      patchBool = true;
      loveDisabledBool = false;
      hateDisabledBool = true;
      hateClass = "hatedBtn";
      loveClass = "unlovedBtn";
    } else {
      patchBool = true;
      loveDisabledBool = true;
      hateDisabledBool = false;
      hateClass = "unhatedBtn";
      loveClass = "lovedBtn";
    }

    mAPI.searchWithId(mdbId)
      .then(movieById => {

        const movieObject = {
          dbid: movieById.id,
          title: `${movieById.title}`,
          releaseDate: movieById.release_date,
          posterPath: imageHandler(),
          revenue: movieById.revenue,
          overview: movieById.overview,
          tagline: movieById.tagline
        };

        jAPI.get("movies")
          .then(movies => {

            const movieInJson = movies.find(movie => movie.dbid === movieById.id);

            if (movieInJson !== undefined) {

              const loveHateObject = {
                userId: props.activeUserId,
                movieId: movieInJson.id,
                isHated: true
              };

              jAPI.get("loveHates")
                .then(loveHatesFetch => {

                  const loveHateFound = loveHatesFetch.find(object => object.userId === activeUserId && object.movieId === movieInJson.id);
                  console.log("lovehatefound", loveHateFound)
                  if (loveHateFound === undefined) {

                    jAPI.save(loveHateObject, "loveHates")
                    jAPI.userMovieExpand("lovehates", activeUserId)
                      .then(lhs => {
                        lhs.filter(lh => {
                          if (lh.movie.dbid === mdbId && lh.userId === activeUserId) {
                            console.log("lh.id", lh, lh.id)
                            loveHateFoundId = lh.id
                            setLoveHateId(loveHateFoundId)
                          }
                        })
                      })
                  } else {
                    loveHateFoundId = loveHateFound.id
                    setLoveHateId(loveHateFoundId)
                    const toggleIsHated = { isHated: patchBool }
                    jAPI.patch(toggleIsHated, "loveHates", loveHateFoundId)
                  }
                });

            } else {

              jAPI.save(movieObject, "movies")
                .then(movieObj => {

                  const loveHateObjectToSave = {
                    userId: props.activeUserId,
                    movieId: movieObj.id,
                    isHated: patchBool
                  };
                  jAPI.save(loveHateObjectToSave, "loveHates");
                  jAPI.userMovieExpand("lovehates", activeUserId)
                    .then(lhs => {
                      lhs.filter(lh => {
                        if (lh.movie.dbid === mdbId && lh.userId === activeUserId) {
                          loveHateFoundId = lh.id
                          console.log("145 lhfound lh.id", loveHateFoundId, lh.id)
                          setLoveHateId(loveHateFoundId)
                        }
                      })
                    })
                })
            }
          })
        setLoveHateId(loveHateFoundId);
        setHateBtnState({ name: hateClass });
        setLoveBtnState({ name: loveClass });
        setIsLoveDisabled(loveDisabledBool);
        setIsHateDisabled(hateDisabledBool);
        setHasBeenChanged(!hasBeenChanged)
      })
  };

  const handleForget = () => {
    jAPI.delete(loveHateId, "loveHates");
    setLoveHateId(false);
    setHateBtnState({ name: "unhatedBtn" });
    setLoveBtnState({ name: "unlovedBtn" });
    setIsLoveDisabled(false);
    setIsHateDisabled(false);
    setHasBeenChanged(!hasBeenChanged)
    props.setKeyword(props.keyword);
  };

  const forgetJSX = () => {
    if (loveHateId !== false) {
      return (
        <>
          <button
            id={`hate-button--${props.result.id}`}
            onClick={handleForget}
            className="forgetBtn">
            <span >forget</span>
          </button>{' '}</>)
    }
  }

  const release = () => {
    const releaseDate = "release_date";
    if (props.result[releaseDate] !== undefined) {
      return props.result[releaseDate].split("-")[0];
    };
  };

  const imageHandler = () => {
    if (props.result.poster_path !== null) {
      return `https://image.tmdb.org/t/p/w500${props.result.poster_path}`;
    } else {
      return poster;
    };
  };



  useEffect(() => {
    buttons();

  }, []);

  return (
    <>
        {/* <Button color="danger" onClick={toggle}>HELLO</Button> */}
      <div onClick={toggle}>

        <CardImg id="" top src={imageHandler()} alt={`${props.result.title} poster`} className="cardImage" />
        <CardTitle>{props.result.title}</CardTitle>
        <CardSubtitle>{release()}</CardSubtitle>
        <CardBody >
          <div className="buttonRow">
            <button
              id={`hate-button--${props.result.id}`}
              onClick={(e) => handleClick(e)}
              className={hateBtnState.name}
              disabled={isHateDisabled}
            ><span >Hate</span></button>
            <button
              id={`love-button--${props.result.id}`}
              onClick={(e) => handleClick(e)}
              className={loveBtnState.name}
              disabled={isLoveDisabled}><span >Love</span></button>{' '}
            {' '}
            {forgetJSX()}
          </div>
        </CardBody>
        <Modal isOpen={modal} toggle={toggle} className="">
          <ModalHeader toggle={toggle}>{props.result.title}<span className="releaseDate">{release()}</span></ModalHeader>
          <ModalBody>
            <MovieDetails mdbId={mdbId} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>






      </div>
    </>
  )
}

export default SearchCard