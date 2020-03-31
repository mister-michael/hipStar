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
import MovieDetails from "../card/MovieDetails"

const LoveHates = (props) => {
  // const [footerStyle, setFooterStyle] = useState();
  // const [loveHateButtonClass, setLoveHateButtonClass] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const loveHateObject = props.loveHateObject
  console.log(loveHateObject, "loveHateObject")
  const loveHateId = props.loveHateObject.id
  // console.log("DBID", loveHateObject.movie.dbid)

  let buttonText = ""
  let buttonClass = ""

  const activeUserId = props.userId


  loveHateObject.isHated ? buttonText = "love" : buttonText = "hate"
  loveHateObject.isHated ? buttonClass = "unlovedBtn" : buttonClass = "unhatedBtn"

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
  }, [])

  return (

    <>
      <div onClick={toggle} className="card">
        <CardTitle>{loveHateObject.movie.title}</CardTitle>
        <CardImg id="" top src={loveHateObject.movie.posterPath} alt={`${loveHateObject.movie.title} poster`} className="cardImage" />
        {/* <CardSubtitle>{release()}</CardSubtitle> */}
        <CardBody >
          <div className="buttonRow">
            <button
              id={`love-button--${loveHateObject.id}`}
              onClick={handleClick}
              className={buttonClass}
            ><span >{buttonText}</span></button>{' '}
            <button
              id={`hate-button--${loveHateObject.id}`}
              onClick={handleDelete}
              className="forgetBtn"

            ><span >Forget</span></button>{' '}
          </div>
        </CardBody>
        <Modal isOpen={modal} toggle={toggle} className="">
          <ModalHeader toggle={toggle}>{loveHateObject.movie.title}<span className="releaseDate">{release()}</span></ModalHeader>
          <ModalBody>
            <MovieDetails mdbId={loveHateObject.movie.dbid} />
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

export default LoveHates;