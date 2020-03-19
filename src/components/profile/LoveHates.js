import React, { useEffect } from "react";
import "./LoveHate.css"

const LoveHates = (props) => {
  
  const userObject = props.userObject

  useEffect (() => {

  }, [])

  return (
    <>
      <div id={`loveHates--${userObject.loveHateId}`} className="loveHateList">
        <img src={userObject.image} className="loveHateImage" alt="movie poster"></img>
        <div>{userObject.title}</div>
      </div>
    </>
  )
}

export default LoveHates;