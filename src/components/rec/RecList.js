import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";
import RecCard from "./RecCard";
import LoveHates from "../profile/LoveHates"
import mAPI from "../../modules/movieManager";
import "../search/Search.css"

const RecList = (props) => {

  const activeId = parseInt(props.userId)

  const [activeHate, setActiveHate] = useState([]);
  const [activeLove, setActiveLove] = useState([]);
  const [recommendations, setRecommendations] = useState([])
  const [topMatch, setTopMatch] = useState([])

  const recEngine = () => {

    return jAPI.userMovieExpand("loveHates", activeId)
      .then(userLoveHates => {
        const userHates = userLoveHates.filter(element => element.isHated === true)
        jAPI.movieExpand("loveHates")
          .then(overallLoveHates => {
            const overallHates = overallLoveHates.filter(olh => olh.userId !== activeId && olh.isHated === true);
            // console.log("overallLoveHates", overallLoveHates)
            const sameSameArr = []
            userHates.forEach(userHate => {
              for (let i = 0; i < overallHates.length; i++) {
                if (userHate.movieId === overallHates[i].movieId) {
                  sameSameArr.push(overallHates[i])
                }
              }
            })

            console.log("sameSameArr, movieHates of other users which match the active users", sameSameArr)

            const userIdArry = sameSameArr.map(object => object.userId)
            const userIdSet = [...new Set(userIdArry)]
            const userTallyArr = []

            userIdSet.forEach(element => {
              const tallyObject = { userId: element, tally: 0 }
              userTallyArr.push(tallyObject)
            })

            sameSameArr.forEach(sameSame => {
              for (let i = 0; i < userIdSet.length; i++) {
                if (sameSame.userId === userIdSet[i]) {
                  const tallyIndex = userTallyArr.findIndex(element => element.userId === sameSame.userId)
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
              return 0;
            })

            let topMatch = ""
            tallyToSort.length > 0 ? topMatch = tallyToSort[0].userId : topMatch = 1

            console.log("topMatch", topMatch)

            jAPI.userMovieExpand("loveHates", topMatch)
              .then(topMatchLoveHates => {
                console.log(topMatchLoveHates, "topMatchLoveHates")
                const loveArr = []
                const hateArr = []
                topMatchLoveHates.forEach(lh => {

                  lh.isHated ? hateArr.push(lh) : loveArr.push(lh)

                })
                console.log(userLoveHates, "userLoveHates")

                const loveArrPruned = loveArr.filter(lovedMovie => userLoveHates.filter(rated => lovedMovie.movieId !== rated.movieId))
                const loveArrToPrune = []
                loveArr.map(lovedMovie => {
                  let count = 0
                  for (let i = 0; i < userLoveHates.length; i++) {
                    if (userLoveHates[i].movieId !== lovedMovie.movieId) { count++ }

                  }
                  if (count === userLoveHates.length) {
                    console.log("if statement")
                    loveArrToPrune.push(lovedMovie)
                  }
                })

                jAPI.getWithId("users", topMatch)
                  .then(matchedUser => setTopMatch(matchedUser))
                console.log(loveArrToPrune)
                setRecommendations(loveArrToPrune)
                console.log(userLoveHates.length)

                console.log("tallyToSort", tallyToSort)
              })
          })
      })
  }

  useEffect(() => {
      recEngine();
    
  }, []);

  if (recommendations.length === 0) {
    return (null)
  } else {
    return (
      <>
          <h2 className="headline headlineGreen headlineTextBlack">Movies You Might'nt Hate</h2>
          <div className="headline headlineRed headlineTextWhite">From User: {topMatch.username}</div>
        <div className="marginTop">
          <div className="cardGroup">
            {recommendations.map(res => <RecCard key={res.id} loveHateObject={res} {...props} />)}
          </div>
        </div>
      </>
    )
  }
}

export default RecList