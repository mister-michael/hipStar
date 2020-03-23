import React, { useEffect } from "react";
import { Button } from 'reactstrap';
import "./LoveHate.css";

const LoveHates = (props) => {

  const userObject = props.userObject
  console.log(userObject)

  const handleClick = () => {

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
        onClick={handleClick}>hate</Button>{' '}
        <Button color="">delete</Button>
      </div>
    </>
  )
}

export default LoveHates;