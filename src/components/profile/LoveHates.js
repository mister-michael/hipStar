import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import "./LoveHate.css";
import jAPI from "../../modules/apiManager"

const LoveHates = (props) => {

  const userObject = props.userObject
  const loveHateId = props.userObject.id
  let buttonText = ""

  userObject.isHated ? buttonText = "love" : buttonText = "hate"
  console.log(userObject)
  console.log(buttonText, "btn text")

  const handleClick = () => {
    //update loveHate.isHated == opposite
    //retrigger getUserMovies and getUserObject
    let isHatedState = userObject.isHated
    console.log("isHatedState", isHatedState)
    let isHated = {isHated: true}
    if (isHatedState === true) {
      isHated = false
    } else if (isHatedState === false) {
      isHated = true
    }
    console.log("ishated", isHated)
    jAPI.patch(isHated, "loveHates", loveHateId)
    props.getUserMovies()

  }

  useEffect(() => {

  }, [])

  return (
    <>
      <div id={`loveHates--${userObject.id}`} className="loveHateList">
        <img src={userObject.movie.posterPath} className="loveHateImage" alt="movie poster"></img>
        <div>{userObject.movie.title}</div>
      </div>
      <div>
        <Button
          color=""
          onClick={handleClick}>{buttonText}</Button>{' '}
        <Button color="">delete</Button>
      </div>
    </>
  )
}

export default LoveHates;