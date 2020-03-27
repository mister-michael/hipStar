import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"
import "./Hpstr.css"

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
            <h2 className="headline">the only movie to ever see</h2>
            <section className="andysContainer">
                <div className="andysDiv">
                    <div className="bodyContainer">
                    </div>
                    <img src={movieObject.posterPath} alt="poster"
                        className="hpstrImage" />
                    <div className="bodyContainer">
                        <h5 className="hpstrMovieTitle">{movieObject.title}</h5>
                        <div>{movieObject.overview}</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hpstr;