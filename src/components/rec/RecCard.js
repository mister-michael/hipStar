import React, { useEffect, useState } from "react";
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader
} from 'reactstrap';
// import "./Rec.css"
import "../search/Search.css"
import jAPI from "../../modules/apiManager"

const RecCard = (props) => {
  // const [footerStyle, setFooterStyle] = useState();
  // const [loveHateButtonClass, setLoveHateButtonClass] = useState("");

  const loveHateObject = props.loveHateObject
  const loveHateId = props.loveHateObject.id

  let buttonText = ""
  let buttonClass = ""

  const activeUserId = props.userId


  loveHateObject.isHated ? buttonText = "love" : buttonText = "hate"
  loveHateObject.isHated ? buttonClass = "lovedBtn" : buttonClass = "hatedBtn"

  const handleClick = () => {

    
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
        <div className="">
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
        </div>
    </>
  )
}

export default RecCard;