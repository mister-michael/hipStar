import React from "react";
import "./Search.css"
import mAPI from "../../modules/movieManager";
import jAPI from "../../modules/apiManager";

const SearchCard = (props) => {
  const releaseYear = props.result.release_date.split("-")[0]

  const movieId = props.result.id


  const handleAdd = () => {
    
    mAPI.searchWithId(movieId)
      .then(movieById => {
        console.log(movieById)
        const movieObject = {
          dbid: `${movieById.id}`,
          imdb_Id: `${movieById.imdb_Id}`,
          title: movieById.title,
          release_date: movieById.release_date,
          poster_path: movieById.poster_path,
          revenue: movieById.revenue,
          overview: movieById.overview,
          tagline: movieById.tagline
        }
        jAPI.save(movieObject, "movies")
        props.searchInput.value = ""
      })
  }

  return (
    <>
      <div id={`searchCard--${props.result.id}`} className="searchCard">
        <img src={`https://image.tmdb.org/t/p/w500${props.result.poster_path}`} className="searchImage" />
        <div className="cardHeader">{props.result.title}</div>
        <div>{props.result.overview} - {releaseYear}</div>
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