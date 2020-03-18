import React from "react";
import "./Search.css"
import mAPI from "../../modules/movieManager";
import jAPI from "../../modules/apiManager";

const SearchCard = (props) => {



  const movieId = props.result.id

  let poster = "https://harperlibrary.typepad.com/.a/6a0105368f4fef970b01b8d23c71b5970c-800wi"

  const imageHandler = () => {
    if (props.result.poster_path !== null) {
      return `https://image.tmdb.org/t/p/w500${props.result.poster_path}`
    } else {
      return poster
    }
  }

  const handleAdd = () => {


    mAPI.searchWithId(movieId)
      .then(movieById => {
        console.log(movieById)
        const movieObject = {
          dbid: movieById.id,
          title: movieById.title,
          release_date: movieById.release_date,
          poster_path: imageHandler(),
          revenue: movieById.revenue,
          overview: movieById.overview,
          tagline: movieById.tagline
        }
        jAPI.save(movieObject, "movies")
        jAPI.get("movies")
        .then(movies => {
          const movieInJson = movies.find(movie => movie.dbid == movieById.id)
          const loveHateObject = {
            userId: props.activeUserId,
            movieId: movieInJson.id,
            isHated: true
          }
          jAPI.save(loveHateObject, "loveHates")
        })
        
        props.searchInput.value = ""
      })
  };

  const release = () => {
    const releaseDate = "release_date";
    if (props.result[releaseDate] !== undefined) {
      return props.result[releaseDate].split("-")[0]
    }
  }

  return (
    <>
      <div id={`searchCard--${props.result.id}`} className="searchCard">
        <img src={imageHandler()} className="searchImage" />
        <div className="cardHeader">{props.result.title} - {release()}</div>
        <div>{props.result.overview}</div>
        <button
          id={`button--${props.result.id}`}
          name="button"
          type="button"
          onClick={handleAdd}>Add</button>
      </div>
    </>
  )
}

export default SearchCard