import React from "react";
import { Table } from 'reactstrap';
import jAPI from "../../modules/apiManager";
import "./LoveHate.css"

const LoveHates = (props) => {
  
  const userObject = props.userObject
  console.log(userObject)

  return (
    <>
      <div id={`loveHates--${userObject.loveHateId}`} className="loveHateList">
        <img src={userObject.image} className="loveHateImage"></img>
        <div>{userObject.title}</div>
      </div>
    </>
  )
}

export default LoveHates;