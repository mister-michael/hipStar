import React from "react";
import { Table } from 'reactstrap';
import jAPI from "../../modules/apiManager";

const LoveHates = (props) => {
  
  const userObject = props.userObject
  console.log(userObject)

  return (
    <>
      <div id={`loveHates--${userObject.loveHateId}`}>
        <img src={userObject.image}></img>
        <div>{userObject.title}</div>
      </div>
      <div>hi</div>
    </>
  )
}

export default LoveHates;