import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import "./LoveHate.css";
import "../search/Search.css";
import jAPI from "../../modules/apiManager";
import MovieDetails from "../card/MovieDetails";
import Comment from "../comment/Comment"

const LoveHates = (props) => {
  // const [footerStyle, setFooterStyle] = useState();
  // const [loveHateButtonClass, setLoveHateButtonClass] = useState("");
  const [didUserComment, setDidUserComment] = useState(false);
  const [userCommentId, setUserCommentId] = useState([]);
  const [mvid, setMvid] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoveHate, setIsLoveHate] = useState(true);

  const toggle = () => setModal(!modal);


  const loveHateObject = props.loveHateObject
  console.log(loveHateObject, "loveHateObject")
  const loveHateId = props.loveHateObject.id
  // console.log("DBID", loveHateObject.movie.dbid)

  let buttonText = ""
  let buttonClass = ""

  const activeUserId = props.userId


  loveHateObject.isHated ? buttonText = "LOVE" : buttonText = "HATE"
  loveHateObject.isHated ? buttonClass = "closeButtonColor" : buttonClass = "closeButtonColor"

  const handleClick = () => {

    let isHatedState = loveHateObject.isHated;

    let isHatedObj = {
      isHated: ""
    };

    if (isHatedState === true) {
      isHatedObj.isHated = false

    } else if (isHatedState === false) {
      isHatedObj.isHated = true
    };
    console.log("ishated", isHatedObj);
    // jAPI.update(isHatedObj, "loveHates");
    jAPI.patch(isHatedObj, "loveHates", loveHateId)
    props.getUserObject(activeUserId);
    props.getUserMovies();
  }

  const handleDelete = () => {
    // if (window.confirm("delete this movie from your profile")) {
    jAPI.delete(loveHateId, "loveHates");
    props.getUserObject(activeUserId);
    props.getUserMovies();
    // }
  };

  const release = () => {
    // const releaseDate = "release_date";
    if (loveHateObject.movie.releaseDate !== undefined) {
      return loveHateObject.movie.releaseDate.split("-")[0];
    };
  };


  useEffect(() => {
    setIsLoveHate(true)
    console.log(isLoveHate)
  }, [])

  return (

    <>
      <div onClick={toggle} className="card movieCard shadow">
        <div className="">
        </div>
        <CardImg id="" top src={loveHateObject.movie.posterPath} alt={`${loveHateObject.movie.title} poster`} className="cardImage" />
        {/* <CardSubtitle>{release()}</CardSubtitle> */}
        <CardTitle className="loveHateTitle">{loveHateObject.movie.title}</CardTitle>
        <CardBody >
          
        </CardBody>
        <Modal isOpen={modal} toggle={toggle} className="modalModel">
          <ModalHeader className="" toggle={toggle}>
            <span className="modalHeaderText" >{loveHateObject.movie.title}</span>
            <span className="releaseDateDetails">{release()}</span>
          </ModalHeader>
          <ModalBody>
            <MovieDetails mdbId={loveHateObject.movie.dbid} />
            <Comment
              isLovehate={isLoveHate}
              setIsLoveHate={setIsLoveHate}
              className="commentContainer"
              mdbId={loveHateObject.movie.dbid}
              mvid={mvid}
              setMvid={setMvid}
              activeUserId={activeUserId}
              didUserComment={didUserComment}
              setDidUserComment={setDidUserComment}
              userCommentId={userCommentId}
              setUserCommentId={setUserCommentId}
              refresh={refresh}
              setRefresh={setRefresh} />
          </ModalBody>
          <ModalFooter className="">
            <Button className="closeButtonColor" onClick={toggle}>close</Button>
          </ModalFooter>
        </Modal>
        <div className="buttonRow">
            <Button
              size="sm"
              id={`love-button--${loveHateObject.id}`}
              onClick={handleClick}
              className={buttonClass}
            ><span >{buttonText}</span></Button>{' '}
            <Button
              size="sm"
              id={`hate-button--${loveHateObject.id}`}
              onClick={handleDelete}
              className="closeButtonColor"

            ><span >X</span></Button>{' '}
          </div>
      </div>
    </>
  )
}

export default LoveHates;