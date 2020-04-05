import React, { useState, useEffect } from "react";
// import jAPI from "../../modules/apiManager"
import mAPI from "../../modules/movieManager"
import SearchCard from "./SearchCard"
import "./Search.css"
import {CardGroup} from "reactstrap"

const Search = (props) => {

  const [keyword, setKeyword] = useState({ searchInput: "" });
  const [results, setResults] = useState([]);
  const [loveHateId, setLoveHateId] = useState(false);

  const searchInput = document.getElementById("searchInput")

  const handleFieldChange = evt => {
    const stateToChange = { ...keyword };
    stateToChange[evt.target.id] = evt.target.value;
    setKeyword(stateToChange);
  };

  const handleSearch = () => {

    const stringArr = keyword.searchInput.split(" ").join("+");

    mAPI.search(stringArr)
      .then(searchResults => {
        setResults(searchResults.results)
        console.log(searchResults)
      })

      // searchInput.value = ""
  }

  useEffect(() => {
  }, [])

  return (
    <>
    <div className="headline headlineRed headlineTextBlack">search
      {/* <label htmlFor="searchInput">Search</label> */}
      <div className="movieSearchInput">
      <input
        id="searchInput"
        className="greenBorder movieSearchInput"
        type="text"
        placeholder="movie title"
        onChange={handleFieldChange}
        onKeyUp={evt => evt.key === "Enter" ? handleSearch(evt) : null}
      />
      {/* <inline className="searchInstructions">enter a movie title</inline> */}
      </div>
      </div>
      {/* <button
        id="searchBtn"
        type="button"
        onClick={handleSearch}>
        Submit</button> */}
      <div id="searchResults" className="cardGroup marginTop">
        {results.map(res => <SearchCard className="" loveHateId={loveHateId} setLoveHateId={setLoveHateId} keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} key={res.id} result={res} searchInput={searchInput} userId={props.activeUserId} {...props} />)}
      </div>
      

    </>
  )
}

export default Search;