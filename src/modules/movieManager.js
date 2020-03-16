import apiKey from "../../api/apiKey"
const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=";
const detailsUrl = "https://api.themoviedb.org/3/movie/";
const jsonUrl = "http://localhost:5002/";


const mAPI = {
  search(keyword) {
    console.log("API.search", searchUrl + apiKey + "&query=" + keyword)
    return fetch(searchUrl + apiKey + "&query=" + keyword).then(entries => entries.json());
  },
  searchWithId(id) {
    console.log("API.searchWithId", detailsUrl + id + "?api_key=" + apiKey)
    return fetch(detailsUrl + id + "?api_key=" + apiKey).then(entries => entries.json());
  },
}

export default mAPI;

