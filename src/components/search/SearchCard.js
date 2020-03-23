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
  const [classNames, setClassNames] = useState({loveClass: "unlovedBtn", hateClass: "unhatedBtn"});
  const [textColors, setTextColors] = useState({loveText: "redText", hateText: "greenText"})

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

                    window.alert("already on your list")
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
          setClassNames({loveClass: "unlovedBtn", hateClass: "hatedBtn"});
          setTextColors({loveText: "redText", hateClass: "whiteText"});
        props.searchInput.value = "";
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

                    window.alert("already on your list")
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
        setClassNames({loveClass: "lovedBtn", hateClass: "unhatedBtn"});
        setTextColors({loveText: "whiteText", hateClass: "greenText"});
        props.searchInput.value = ""
      })
  };

  const release = () => {
    const releaseDate = "release_date";
    if (props.result[releaseDate] !== undefined) {
      return props.result[releaseDate].split("-")[0];
    };
  };

  useEffect(() => {

  }, [classNames]);

  return (
    <>

      <div className="card">
        <CardImg id="" top src={imageHandler()} alt={`${props.result.title} poster`} className="cardImage" />
        <CardTitle>{props.result.title}</CardTitle>
        <CardSubtitle>{release()}</CardSubtitle>
        <CardBody className="css1">
          <Button outline 
          id={`love-button--${props.result.id}`}
            onClick={handleLove} 
            className={classNames.loveClass}><span className={textColors.loveText}>Love</span></Button>{' '}
          <Button outline 
          id={`hate-button--${props.result.id}`}
            onClick={handleHate} 
            className={classNames.hateClass}
            ><span className={textColors.hateText}>Hate</span></Button>{' '}
        </CardBody>
      </div>


    </>
  )
}

export default SearchCard