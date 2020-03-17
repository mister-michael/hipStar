import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager"
import mAPI from "../../modules/movieManager"
import SearchCard from "./SearchCard"

const Search = (props) => {

  const [keyword, setKeyword] = useState({ searchInput: "" });
  const [results, setResults] = useState([]);

  const handleFieldChange = evt => {
    const stateToChange = { ...keyword };
    stateToChange[evt.target.id] = evt.target.value;
    setKeyword(stateToChange);
  };

  // const handleSearch = () => {
  //   return mAPI.search(keyword.searchInput)
  //     .then(movies => {
  //       const dbid = `${movies.results[0].id}`
  //       mAPI.searchWithId(dbid)
  //         .then(movieById => {
  //           console.log(movieById)
  //           const movieObject = {
  //             dbid: `${movieById.id}`,
  //             imdb_Id: `${movieById.imdb_Id}`,
  //             title: movieById.title,
  //             release_date: movieById.release_date,
  //             poster_path: movieById.poster_path,
  //             revenue: movieById.revenue,
  //             overview: movieById.overview,
  //             tagline: movieById.tagline
  //           }
  //           jAPI.save(movieObject, "movies")
  //         })
  //     })
  // }

  const handleSearch = () => {

    let string = ""

    const stringArr = keyword.searchInput.split(" ");

    for (let i = 0; i < stringArr.length; i++)
      (i < stringArr.length - 1) ? string += stringArr[i] + `+` : string += stringArr[i]

    console.log('string', string)

    mAPI.search(string)
      .then(searchResults => {
        setResults(searchResults)
        console.log(results)
        console.log(searchResults)
      })


  }

  return (
    <>
      <label htmlFor="searchInput">Search</label>
      <input
        id="searchInput"
        type="text"
        onChange={handleFieldChange}
      />
      <button
        id="searchBtn"
        type="button"
        onClick={handleSearch}>
        Submit</button>
      <div
        id="results"
      >
        {results.map(el => <SearchCard key={`${el.id}`} result={el} {...props} />)}
      </div>

    </>
  )
}

export default Search;