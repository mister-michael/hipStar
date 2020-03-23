import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import "./LoveHate.css";
import jAPI from "../../modules/apiManager"

const LoveHates = (props) => {

  const loveHateObject = props.loveHateObject
  const loveHateId = props.loveHateObject.id
  let buttonText = ""

  loveHateObject.isHated ? buttonText = "love" : buttonText = "hate"
  console.log(loveHateObject)
  console.log(buttonText, "btn text")

  const handleClick = () => {
    //update loveHate.isHated == opposite
    //retrigger getUserMovies and getUserObject
    let isHatedState = loveHateObject.isHated;
    console.log("isHatedState", isHatedState)
    let isHatedObj = {
      id: parseInt(loveHateId),
      isHated: loveHateObject.isHated,
      movieId: loveHateObject.movieId,
      userId: loveHateObject.userId
    };
    if (isHatedState === true) {
      isHatedObj.isHated = false
    } else if (isHatedState === false) {
      isHatedObj.isHated = true
    };
    console.log("ishated", isHatedObj);
    jAPI.update(isHatedObj, "loveHates");
    props.getUserMovies();

  }

  const handleDelete = () => {
    if (window.confirm("delete this movie from your profile")) {
    jAPI.delete(loveHateId, "loveHates");
    props.getUserMovies();
  }
  };

  useEffect(() => {

  }, [])

  return (
    <>
      <div id={`loveHates--${loveHateObject.id}`} className="loveHateList">
        <img src={loveHateObject.movie.posterPath} className="loveHateImage" alt="movie poster"></img>
        <div>{loveHateObject.movie.title}</div>
      </div>
      <div>
        <Button
          color=""
          onClick={handleClick}>{buttonText}</Button>{' '}
        <Button 
        color=""
        onClick={handleDelete}>delete</Button>
      </div>
    </>
  )
}

export default LoveHates;