import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager"
import mAPI from "../../modules/movieManager"
import SearchCard from "./SearchCard"

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

    let string = ""

    const stringArr = keyword.searchInput.split(" ").join("+");

    // for (let i = 0; i < stringArr.length; i++) {
    //   string += (i < stringArr.length - 1) ? stringArr[i] + `+` : stringArr[i]
    // }

    mAPI.search(stringArr)
      .then(searchResults => {
        setResults(searchResults.results)
        console.log(searchResults)
      })
  }

//after movie is added i'll want to
//    remove the card from the list?
//    push to /profile?
//    clear the search field
  return (
    <>
      <label htmlFor="searchInput">Search</label>
      <input
        id="searchInput"
        type="text"
        onChange={handleFieldChange}
        onKeyUp={evt => evt.key === "Enter" ? handleSearch(evt) : null}
      />
      <button
        id="searchBtn"
        type="button"
        onClick={handleSearch}>
        Submit</button>
      <div>
        {results.map(el => <SearchCard key={el.id} result={el} searchInput={searchInput} {...props} />)}
      </div>

    </>
  )
}

export default Search;