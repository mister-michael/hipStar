import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";
import LoveHates from "../profile/LoveHates";
import mAPI from "../../modules/movieManager";

const RecList = (props) => {

  const activeId = parseInt(props.userId)

  const [activeHate, setActiveHate] = useState([]);
  const [activeLove, setActiveLove] = useState([])
  const [loveState, setLoveState] = useState([])
  const [hateState, setHateState] = useState([])


  const recEngine = () => {

    return jAPI.userMovieExpand("loveHates", activeId)
      .then(userLoveHates => {
        const userHates = userLoveHates.filter(element => element.isHated === true)
        const userLoves = userLoveHates.filter(element => element.isHated === false)
        console.log(userHates)
        jAPI.movieExpand("loveHates")
          .then(overallLoveHates => {
            const overallHates = overallLoveHates.filter(element => element.userId !== activeId && element.isHated === true);
            // console.log(olh)
            const sameSameArr = []
            userHates.forEach(ulhObject => {
              for (let i = 0; i < overallHates.length; i++) {
                if (ulhObject.movieId === overallHates[i].movieId) {
                  sameSameArr.push(overallHates[i])
                }
              }
            })
            const userIdArry = sameSameArr.map(object => object.userId)
            const userIdSet = [...new Set(userIdArry)]
            const userTallyArr = []
            userIdSet.forEach(element => {
              const tallyObject = { userId: element, tally: 0 }
              userTallyArr.push(tallyObject)
            })

            sameSameArr.forEach(lh => {
              for (let i = 0; i < userIdSet.length; i++) {
                if (lh.userId === userIdSet[i]) {
                  const tallyIndex = userTallyArr.findIndex(element => element.userId === lh.userId)
                  userTallyArr[tallyIndex].tally += 1
                  console.log(userTallyArr[tallyIndex], "uta[tallyIndex]")
                }
              }
            })

            const tallyToSort = userTallyArr
            tallyToSort.sort(function compare(a, b) {
              if (a.tally > b.tally) {
                return -1;
              }
              if (a.tally < b.tally) {
                return 1;
              }
              // a must be equal to b
              return 0;
            })

            const topMatch = tallyToSort[0].userId

            jAPI.userMovieExpand("loveHates", topMatch)
            .then(loveHates => {
              const loveArr = []
              const hateArr = []
              loveHates.forEach(lh => {
                const displayObject = {
                  image: lh.movie.posterPath,
                  title: lh.movie.title,
                  loveHateId: lh.id
                }
                if (lh.isHated === true) {
                  loveArr.push(displayObject)
                } else {
                  hateArr.push(displayObject)
                }
              })
              setLoveState(loveArr)
              setHateState(hateArr)
            })

            loveState.forEach(lovedMovie => {
              //compare lovedMovieId to userHates and userLoves
              
            })

            


            console.log("tallyToSort", tallyToSort)


            console.log(userIdArry)
            console.log(sameSameArr, "sameSameArr")

            console.log(userIdSet)

          })
      })

    

  }


  useEffect(() => {
    recEngine();
  }, []);

  return (
    <>
    <div>From User: {loveState.username}</div>
    <div>
    <h2>Movies You Might'nt Hate</h2>
    {loveState.map(res => <LoveHates key={res.loveHateId} userObject={res} {...props} />)}
  </div>
  </>
  )
}

export default RecList