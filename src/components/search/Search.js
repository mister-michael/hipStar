import React, { useState, useEffect } from "react";
// import jAPI from "../../modules/apiManager"
import mAPI from "../../modules/movieManager"
import SearchCard from "./SearchCard"
import "./Search.css"

const Search = (props) => {

  const [keyword, setKeyword] = useState({ searchInput: "" });
  const [results, setResults] = useState([]);

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

      searchInput.value = ""
  }

  useEffect(() => {
  }, [])

  return (
    <>
      <label htmlFor="searchInput">Search</label>
      <input
        id="searchInput"
        type="text"
        onChange={handleFieldChange}
        onKeyUp={evt => evt.key === "Enter" ? handleSearch(evt) : null}
      />
      {/* <button
        id="searchBtn"
        type="button"
        onClick={handleSearch}>
        Submit</button> */}
      <div className="css2">
        {results.map(res => <SearchCard className="" key={res.id} result={res} searchInput={searchInput} userId={props.activeUserId} {...props} />)}
      </div>

    </>
  )
}

export default Search;