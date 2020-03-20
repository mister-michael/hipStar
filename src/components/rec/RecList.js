import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";
import LoveHates from "../profile/LoveHates";

const RecList = (props) => {

  const activeId = parseInt(props.userId)

  const [activeHate, setActiveHate] = useState([]);
  const [overallHate, setOverallHate] = useState([])


  const recEngine = () => {

    return jAPI.userMovieExpand("loveHates", activeId)
      .then(userLoveHates => {
        const ulh = userLoveHates.filter(element => element.isHated === true)
        console.log(ulh)
        jAPI.movieExpand("loveHates")
          .then(overallLoveHates => {
            const olh = overallLoveHates.filter(element => element.userId !== activeId && element.isHated === true);
            // console.log(olh)
            const sameSameArr = []
            ulh.forEach(ulhObject => {
              for (let i = 0; i < olh.length; i++) {
                if (ulhObject.movieId === olh[i].movieId) {
                  sameSameArr.push(olh[i])
                }
              }
              console.log(sameSameArr)
            })
            
          })
      })

    // activeUserHate();

    // const overallUserHate = () => {
    //   return jAPI.movieExpand("loveHates")
    //     .then(overallLoveHates => {
    //       const olh = overallLoveHates.filter(element => element.userId !== activeId && element.isHated === true);
    //       const userInCommon = []
    //       olh.forEach(loveHate => {
    //         if (userInCommon.filter(userObj => userObj.userId !== null).length > 1) {
    //           userInCommon.push({userId: loveHate.userId, hateCount: 0})
    //         }
    //       })
    //       console.log("userincommon", userInCommon)

    //       setOverallHate(olh);
    //     })
    // }
    // overallUserHate();

    // const sameMovies = () => {
    //   let sameMovies = [];
    //   for (let i = 0; i < activeHate.length; i++) {
    //     const thingy = overallHate.filter(object => object.movieId === activeHate[i].movieId)
    //     sameMovies = sameMovies.concat(thingy)
    //   }
    //   setOverallHate(sameMovies)
    // };

    // sameMovies();

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