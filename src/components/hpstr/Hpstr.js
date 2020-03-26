import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"

const Hpstr = () => {

  const [movieObject, setMovieObject] = useState({})

    const movieToDisplay = "The Cat and the Canary"

    const fetchMovie = () => {
        return jAPI.get("movies")
            .then(movies => {
                const theOneMovie = movies.filter(movie => movie.title.toLowerCase() === movieToDisplay.toLowerCase())
                setMovieObject(theOneMovie[0])
            })
        }
    
    console.log(movieObject)
    
    useEffect(() => {
        fetchMovie();
    }, [])

    return (
        <>
            <div className="andysDiv">
                <h1>the only movie to ever see</h1>
                <h2>{movieObject.title}</h2>
                <img src={movieObject.posterPath} alt="poster" />
                <div>{movieObject.overview}</div>
            </div>
        </>
    )
}

export default Hpstr;