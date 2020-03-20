import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";
import LoveHates from "../profile/LoveHates";

const RecList = (props) => {

  const activeId  = parseInt(props.userId)

  const [activeHate, setActiveHate] = useState([]);
  const [overallHate, setOverallHate] = useState([])
  

  const recEngine = () => {
    const activeUserHate = () => {
    return jAPI.userMovieExpand("loveHates", activeId)
      .then(userLoveHates => {
        const lh = userLoveHates.filter(element => element.isHated === true)
        // const hatedMovies = userLoveHates.map(el => el.movieId)
        setActiveHate(lh)
      })
  };

  activeUserHate();

  const overallUserHate = () => {
    return jAPI.movieExpand("loveHates")
    .then(overallLoveHates => {
      const olh = overallLoveHates.filter(element => element.userId !== activeId && element.isHated === true);
      const olhFilter = olh.filter(objects => {
        for (let i =0 ; i < activeHate.length; i++) {
          const sameMovies = objects.filter(object => object.movieId === activeHate[i].movieId)
          return sameMovies
        }
      })
      setOverallHate(olhFilter);
    })
  }
    overallUserHate();

}
  console.log(activeHate, "active");
  console.log(overallHate, "overall");

  useEffect(() => {
    recEngine();
  }, []);

  return (
    <div></div>
  )
}

export default RecList