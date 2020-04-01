import React, { useEffect, useState } from "react";
import {
  Card as div, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody,
  Popover, PopoverBody, PopoverHeader,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
// import "./Rec.css"
import "../search/Search.css"
import jAPI from "../../modules/apiManager"
import mAPI from "../../modules/movieManager"
import MovieDetails from "../card/MovieDetails"
import "./Rec.css"
import Comment from "../comment/Comment"

const RecCard = (props) => {
  // const [footerStyle, setFooterStyle] = useState();
  // const [loveHateButtonClass, setLoveHateButtonClass] = useState("");
  const movie = props.result.movie;
  const mdbId = movie.dbid;
  // console.log(mdbId)
  const activeUserId = props.activeUserId;

  // console.log(movie)
  let poster = "https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d23c71b5970c-800wi";

  let loveHateFoundId = ""

  const [loveHateId, setLoveHateId] = useState(false);

  const [loveBtnState, setLoveBtnState] = useState({ name: "" });
  const [hateBtnState, setHateBtnState] = useState({ name: "" });
  const [isLoveDisabled, setIsLoveDisabled] = useState(true);
  const [isHateDisabled, setIsHateDisabled] = useState(true);
  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const [didUserComment, setDidUserComment] = useState(false);
  const [userCommentId, setUserCommentId] = useState([]);
  const [mvid, setMvid] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoveHate, setIsLoveHate] = useState(true);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const result = props.result
  const loveHateObjId = props.result.id

  let buttonText = ""
  let buttonClass = ""
  result.isHated ? buttonText = "love" : buttonText = "hate"
  result.isHated ? buttonClass = "lovedBtn" : buttonClass = "hatedBtn"

  

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

    console.log(e.target.innerHTML, "eeeee.target.innerhtml")
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
    } else if (e.target.innerHTML === "Love") {
      patchBool = false;
      loveDisabledBool = true;
      hateDisabledBool = false;
      hateClass = "unhatedBtn";
      loveClass = "lovedBtn";
    }

    mAPI.searchWithId(mdbId)
      .then(movieById => {

        jAPI.get("movies")
          .then(movies => {

            const movieInJson = movies.find(movie => movie.dbid === movieById.id);

            const loveHateObject = {
              userId: activeUserId,
              movieId: movieInJson.id,
              isHated: patchBool
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

                  // props.getUserObject(activeUserId);
                  // props.getUserMovies();
                }
              });


          })
        setLoveHateId(loveHateFoundId);
        setHateBtnState({ name: hateClass });
        setLoveBtnState({ name: loveClass });
        setIsLoveDisabled(loveDisabledBool);
        setIsHateDisabled(hateDisabledBool);
        setHasBeenChanged(!hasBeenChanged);
        // props.getUserObject(activeUserId)
        // props.getUserMovies();
        // props.setChanged(!props.changed)
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
    // props.setRecUpdated(!props.recUpdated)
    // props.getUserMovies();
    // props.recEngine();
    // props.setChanged(!props.changed)
  };

  const forgetJSX = () => {
    if (loveHateId !== false) {
      return (
        <>
          <button
            id={`hate-button--${props.result.movie.id}`}
            onClick={handleForget}
            className="forgetBtn">
            <span >forget</span>
          </button>{' '}</>)
    }
  }

  const release = () => {
    // const releaseDate = "release_date";
    if (props.result.movie.releaseDate !== undefined) {
      return props.result.movie.releaseDate.split("-")[0];
    }
  };

  const imageHandler = () => {
    if (movie.posterPath !== null) {
      return movie.posterPath;
    } else {
      return poster;
    };
  };


  useEffect(() => {
    setIsLoveHate(true)
    buttons();
    
  }, [])

  return (
    <>
      <div className="card shadow movieCard">
        <div onClick={toggle} >
          <CardImg id="" top src={imageHandler()} alt={`${props.result.movie.title} poster`} className="cardImage" />
          <CardTitle>{props.result.movie.title}</CardTitle>
          {/* <CardSubtitle>{release()}</CardSubtitle> */}
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
            <ModalHeader toggle={toggle}>{props.result.movie.title} <span className="releaseDate">{release()}</span></ModalHeader>
            <ModalBody>
              <MovieDetails mdbId={mdbId} release={release()} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={modal} toggle={toggle} className="modalModel">
          <ModalHeader toggle={toggle}>{props.result.movie.title}<span className="releaseDate">{release()}</span></ModalHeader>
          <ModalBody>
            <MovieDetails mdbId={props.result.movie.dbid} />
            <Comment 
            isLovehate={isLoveHate}
            setIsLoveHate={setIsLoveHate}
            className="commentContainer"
            mdbId={props.result.movie.dbid}
            mvid={props.mvid}
            setMvid={setMvid}
            activeUserId={activeUserId}
            didUserComment={didUserComment}
            setDidUserComment={setDidUserComment}
            userCommentId={userCommentId}
            setUserCommentId={setUserCommentId}
            refresh={refresh}
            setRefresh={setRefresh}/>
          </ModalBody>
          <ModalFooter>
            <Button className="closeButtonColor" onClick={toggle}>close</Button>
          </ModalFooter>
        </Modal>
        </div>
       
      </div>
    </>
  )
}

export default RecCard;