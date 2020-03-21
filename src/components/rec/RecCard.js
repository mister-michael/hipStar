import React, { useEffect } from "react";

const RecCard = (props) => {
  
  const userObject = props.userObject

  useEffect (() => {

  }, [])

  return (
    <>
      <div id={`loveHates--${userObject.id}`} className="loveHateList">
        <img src={userObject.movie.posterPath} className="loveHateImage" alt="movie poster"></img>
        <div>{userObject.movie.title}</div>
      </div>
    </>
  )
}

export default RecCard;