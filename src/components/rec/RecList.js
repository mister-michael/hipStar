import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";
import LoveHates from "../profile/LoveHates";

const RecList = (props) => {

  const [activeHate, setActiveHate] = useState([]);
  const [overallHate, setOverallHate] = useState([])
  

  const activeUserHate = () => {
    return jAPI.userMovieExpand("loveHates", props.userId)
      .then(userLoveHates => {
        userLoveHates.filter(element => element.movie.isHated === true)
        const hatedMovies = userLoveHates.map(el => el.movieId)
        setActiveHate(hatedMovies)
      })
  };

  const overallUserHate = () => {
    return jAPI.movieExpand("loveHates")
    .then(overallLoveHates => {
      overallLoveHates.filter(element => element.movie.isHated === true)
      setOverallHate(overallLoveHates)
    })
  }
  console.log(activeHate, "hello2")
  console.log(overallHate, "overall")

  useEffect(() => {
    activeUserHate();
    overallUserHate();
  }, [])

  return (
    <div></div>
  )
}

export default RecList