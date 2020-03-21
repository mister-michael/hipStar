import React, { useEffect } from "react";
import { Button } from 'reactstrap';
import "./LoveHate.css";

const LoveHates = (props) => {

  const userObject = props.userObject

  useEffect(() => {

  }, [])

  return (
    <>
      <div id={`loveHates--${userObject.loveHateId}`} className="loveHateList">
        <img src={userObject.image} className="loveHateImage" alt="movie poster"></img>
        <div>{userObject.title}</div>
      </div>
      <div>
        <Button color="success">hate</Button>{' '}
        <Button color="danger">love</Button>
      </div>
    </>
  )
}

export default LoveHates;