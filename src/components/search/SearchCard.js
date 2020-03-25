import React, { useEffect, useState } from "react";
import "./Search.css"
import mAPI from "../../modules/movieManager";
import jAPI from "../../modules/apiManager";
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Popover, PopoverBody, PopoverHeader
} from 'reactstrap';

const SearchCard = (props) => {

  const mdbId = props.result.id;
  const activeUserId = props.activeUserId;
  const [loveBtnState, setLoveBtnState] = useState({ name: "" });
  const [hateBtnState, setHateBtnState] = useState({ name: "" });
  const [loveHateId, setLoveHateId] = useState(false);
  const [isLoveDisabled, setIsLoveDisabled] = useState(true);
  const [isHateDisabled, setIsHateDisabled] = useState(true);
  const [hasBeenChanged, setHasBeenChanged] = useState(false)



  let loveHateFoundId = ""

  const searchResult = props.result

  const buttons = () => {
    jAPI.userMovieExpand("loveHates", activeUserId)
      .then(movies => {
        if (movies.length > 0) {
          for (let i = 0; i < movies.length; i++) {
            if (mdbId === movies[i].movie.dbid && movies[i].isHated === true) {
              setHateBtnState({ name: "hatedBtn" });
              setLoveBtnState({ name: "unlovedBtn" });
              setLoveHateId(movies[i].id);
              loveHateFoundId = movies[i].id;
              setIsLoveDisabled(false);
              setIsHateDisabled(true);

              break
            } else if (mdbId === movies[i].movie.dbid && movies[i].isHated === false) {
              setHateBtnState({ name: "unhatedBtn" });
              setLoveBtnState({ name: "lovedBtn" });
              setLoveHateId(movies[i].id);
              loveHateFoundId = movies[i].id;
              setIsLoveDisabled(true);
              setIsHateDisabled(false);

              break
            } else {
              setHateBtnState({ name: "unhatedBtn" });
              setLoveBtnState({ name: "unlovedBtn" });
              setIsLoveDisabled(false);
              setIsHateDisabled(false);
            }
          }
        } else {
          setHateBtnState({ name: "unhatedBtn" });
          setLoveBtnState({ name: "unlovedBtn" });
          setIsLoveDisabled(false);
          setIsHateDisabled(false);
        }
      })
  }
  let poster = "https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d23c71b5970c-800wi";

  const imageHandler = () => {
    if (props.result.poster_path !== null) {
      return `https://image.tmdb.org/t/p/w500${props.result.poster_path}`
    } else {
      return poster
    };
  };

  const handleHate = () => {

    mAPI.searchWithId(mdbId)
      .then(movieById => {

        const movieObject = {
          dbid: movieById.id,
          title: `${movieById.title}`,
          releaseDate: movieById.release_date,
          posterPath: imageHandler(),
          revenue: movieById.revenue,
          overview: movieById.overview,
          tagline: movieById.tagline
        };

        jAPI.get("movies")
          .then(movies => {

            const movieInJson = movies.find(movie => movie.dbid === movieById.id);

            if (movieInJson !== undefined) {

              const loveHateObject = {
                userId: props.activeUserId,
                movieId: movieInJson.id,
                isHated: true
              };

              jAPI.get("loveHates")
                .then(loveHatesFetch => {

                  const loveHateFound = loveHatesFetch.find(object => object.userId === activeUserId && object.movieId === movieInJson.id);


                  if (loveHateFound === undefined) {

                    jAPI.save(loveHateObject, "loveHates")
                  } else {
                    loveHateFoundId = loveHateFound.id
                    const toggleIsHated = { isHated: true }
                    jAPI.patch(toggleIsHated, "loveHates", loveHateFoundId)
                  }
                });

            } else {

              jAPI.save(movieObject, "movies")
                .then(movieObj => {

                  const loveHateObject2 = {
                    userId: props.activeUserId,
                    movieId: movieObj.id,
                    isHated: true
                  };
                  jAPI.save(loveHateObject2, "loveHates");
                })
            }

          })
        setLoveHateId(loveHateFoundId);
        setHateBtnState({ name: "hatedBtn" });
        setLoveBtnState({ name: "unlovedBtn" });
        setIsLoveDisabled(false);
        setIsHateDisabled(true);
        setHasBeenChanged(!hasBeenChanged)
        props.setKeyword(props.keyword);
      })
  };
  const handleLove = () => {

    mAPI.searchWithId(mdbId)
      .then(movieById => {

        const movieObject = {
          dbid: movieById.id,
          title: `${movieById.title}`,
          releaseDate: movieById.release_date,
          posterPath: imageHandler(),
          revenue: movieById.revenue,
          overview: movieById.overview,
          tagline: movieById.tagline
        };

        jAPI.get("movies")
          .then(movies => {

            const movieInJson = movies.find(movie => movie.dbid === movieById.id);

            if (movieInJson !== undefined) {

              const loveHateObject = {
                userId: props.activeUserId,
                movieId: movieInJson.id,
                isHated: true
              };

              jAPI.get("loveHates")
                .then(loveHatesFetch => {
                  const loveHateFound = loveHatesFetch.find(object => object.userId === activeUserId && object.movieId === movieInJson.id);

                  if (loveHateFound === undefined) {

                    jAPI.save(loveHateObject, "loveHates")
                  } else {
                    loveHateFoundId = loveHateFound.id
                    const toggleIsHated = { isHated: false }
                    jAPI.patch(toggleIsHated, "loveHates", loveHateFoundId)
                  }
                });

            } else {

              jAPI.save(movieObject, "movies")
                .then(movieObj => {

                  const loveHateObject2 = {
                    userId: props.activeUserId,
                    movieId: movieObj.id,
                    isHated: false
                  };
                  jAPI.save(loveHateObject2, "loveHates")
                });
            }
          })
        setLoveHateId(loveHateFoundId);
        setHateBtnState({ name: "unhatedBtn" });
        setLoveBtnState({ name: "lovedBtn" });
        setIsLoveDisabled(true);
        setIsHateDisabled(false);
        setHasBeenChanged(!hasBeenChanged);
        props.setKeyword(props.keyword);
      })
  };

  const handleForget = () => {
    jAPI.delete(loveHateId, "loveHates");
    setLoveHateId(false)
    setHateBtnState({ name: "unhatedBtn" });
    setLoveBtnState({ name: "unlovedBtn" });
    setIsLoveDisabled(false);
    setIsHateDisabled(false);
    setHasBeenChanged(!hasBeenChanged)
    props.setKeyword(props.keyword);
  }

  const forgetJSX = () => {
    if (loveHateId !== false) {
      return (<><button
        id={`hate-button--${props.result.id}`}
        onClick={handleForget}
        className="forgetBtn"
      // disabled={isForgetDisabled}
      ><span >forget</span></button>{' '}</>)
    }
  }

  const release = () => {
    const releaseDate = "release_date";
    if (props.result[releaseDate] !== undefined) {
      return props.result[releaseDate].split("-")[0];
    };
  };

  useEffect(() => {
    buttons();

  }, []);

  return (
    <>
      <div className="">
        <CardImg id="" top src={imageHandler()} alt={`${props.result.title} poster`} className="cardImage" />
        <CardTitle>{props.result.title}</CardTitle>
        <CardSubtitle>{release()}</CardSubtitle>
        <CardBody >
          <div className="buttonRow">
            <button
              id={`hate-button--${props.result.id}`}
              onClick={handleHate}
              className={hateBtnState.name}
              disabled={isHateDisabled}
            ><span >Hate</span></button>
            <button
              id={`love-button--${props.result.id}`}
              onClick={handleLove}
              className={loveBtnState.name}
              disabled={isLoveDisabled}><span >Love</span></button>{' '}
            {' '}
            {forgetJSX()}
          </div>
        </CardBody>
      </div>
    </>
  )
}

export default SearchCard