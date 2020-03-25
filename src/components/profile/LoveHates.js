import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import {Card, CardTitle, CardText, CardImg, CardImgOverlay} from 'reactstrap'
import "./LoveHate.css";
import jAPI from "../../modules/apiManager"

const LoveHates = (props) => {
  const [footerStyle, setFooterStyle] = useState();
  const [loveBtnState, setLoveBtnState] = useState();
  const [hateBtnState, setHateBtnState] = useState();

  const loveHateObject = props.loveHateObject
  const loveHateId = props.loveHateObject.id
  let buttonText = ""



  loveHateObject.isHated ? buttonText = "love" : buttonText = "hate"

  const handleClick = () => {
    //update loveHate.isHated == opposite
    //retrigger getUserMovies and getUserObject
    let isHatedState = loveHateObject.isHated;
    console.log("isHatedState", isHatedState)
    let isHatedObj = {
      // id: parseInt(loveHateId),
      // isHated: loveHateObject.isHated,
      // movieId: loveHateObject.movieId,
      userId: loveHateObject.userId
    };
    if (isHatedState === true) {
      isHatedObj.isHated = false
    } else if (isHatedState === false) {
      isHatedObj.isHated = true
    };
    console.log("ishated", isHatedObj);
    // jAPI.update(isHatedObj, "loveHates");
    jAPI.patch(isHatedObj, "loveHates", 2)
    props.getUserMovies();
  }

  const handleDelete = () => {
    if (window.confirm("delete this movie from your profile")) {
      jAPI.delete(loveHateId, "loveHates");
      props.getUserMovies();
    }
  };

  useEffect(() => {
    loveHateObject.isHated === true ? setFooterStyle("redFooter") : setFooterStyle("greenFooter")
  }, [])

  return (
    <>
    <div>
      <Card inverse className="movieCard">
      <CardTitle className="card-movieTitle card-text">{loveHateObject.movie.title}</CardTitle>
        <div>
        <CardImg width="100%" src={loveHateObject.movie.posterPath} alt="Card image cap" />
        </div>
        <>
        <div className={footerStyle}>
            <Button
              color="#3a94bd"
              className="profileBtnText loveDeleteBtnBkg"
              onClick={handleClick}>{buttonText}</Button>{' '}
            <Button
              color=""
              className="profileBtnText loveDeleteBtnBkg"
              onClick={handleDelete}>forget</Button>
          </div>
          
          {/* <CardText className="black">{loveHateObject.movie.overview}</CardText> */}
          
          <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
         
        </>
      </Card>
    </div>
      {/* <div className="movieCard">
        <section className="profile-container">
          <div id={`loveHates--${loveHateObject.id}`} className="loveHateList">
            <img src={loveHateObject.movie.posterPath} className="loveHateImage" alt="movie poster"></img>
              <div className="movieTitleProfile">{loveHateObject.movie.title}</div>
                <div className="overview-container">{loveHateObject.movie.overview}</div>
          </div>
          <div className={footerStyle}>
            <Button
              color=""
              className="profileBtnText loveDeleteBtnBkg"
              onClick={handleClick}>{buttonText}</Button>{' '}
            <Button
              color=""
              className="profileBtnText loveDeleteBtnBkg"
              onClick={handleDelete}>delete</Button>
          </div>
        </section>
      </div> */}
    </>
  )
}

export default LoveHates;