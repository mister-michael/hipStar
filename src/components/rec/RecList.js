import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";
import LoveHates from "../profile/LoveHates";

const RecList = (props) => {

  const activeId  = parseInt(props.userId)

  const [activeHate, setActiveHate] = useState([]);
  const [overallHate, setOverallHate] = useState([])
  

  const activeUserHate = () => {
    return jAPI.userMovieExpand("loveHates", activeId)
      .then(userLoveHates => {
        const lh = userLoveHates.filter(element => element.isHated === true)
        // const hatedMovies = userLoveHates.map(el => el.movieId)
        setActiveHate(lh)
      })
  };

  const overallUserHate = () => {
    return jAPI.movieExpand("loveHates")
    .then(overallLoveHates => {
      const olh = overallLoveHates.filter(element => element.userId !== activeId && element.isHated === true)
      setOverallHate(olh)
    })
  }
  console.log(activeHate, "active")
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