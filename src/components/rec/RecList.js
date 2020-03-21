import React, { useState, useEffect } from "react";
import jAPI from "../../modules/apiManager";
import RecCard from "./RecCard";
import mAPI from "../../modules/movieManager";

const RecList = (props) => {

  const activeId = parseInt(props.userId)

  const [activeHate, setActiveHate] = useState([]);
  const [activeLove, setActiveLove] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [hateState, setHateState] = useState([])


  const recEngine = () => {

    return jAPI.userMovieExpand("loveHates", activeId)
      .then(userLoveHates => {
        const userHates = userLoveHates.filter(element => element.isHated === true)
        const userLoves = userLoveHates.filter(element => element.isHated === false)
        console.log("userHates", userHates)
        jAPI.movieExpand("loveHates")
          .then(overallLoveHates => {
            const overallHates = overallLoveHates.filter(element => element.userId !== activeId && element.isHated === true);
            console.log("overallLoveHates", overallLoveHates)
            const sameSameArr = []
            userHates.forEach(ulhObject => {
              for (let i = 0; i < overallHates.length; i++) {
                if (ulhObject.movieId === overallHates[i].movieId) {
                  sameSameArr.push(overallHates[i])
                }
              }
            })
            console.log("sameSameArr", sameSameArr)
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
            console.log("topMatch", topMatch)

            jAPI.userMovieExpand("loveHates", topMatch)
            .then(topMatchLoveHates => {
              console.log(topMatchLoveHates, "topMatchLoveHates")
              const loveArr = []
              const hateArr = []
              topMatchLoveHates.forEach(lh => {
                
                if (lh.isHated === false) {
                  loveArr.push(lh)
                } else {
                  hateArr.push(lh)
                }
                console.log("loveArr", loveArr)
              })
              //remove activeLoves from loveArr
              //remove activeHates from loveArr
              console.log(userLoveHates, "userLoveHates")
              const loveArrPruned = loveArr.filter(rec => {
                for (let i=0; i < userLoveHates.length; i++) {
                    return rec.movie.id !== userLoveHates[i].movie.id
                }
              })
              console.log("lvoeArrPruned", loveArrPruned)
              setRecommendations(loveArrPruned)
              console.log(recommendations, "recs recs recs")

            })

            

            


            console.log("tallyToSort", tallyToSort)




          })
      })

    

  }


  useEffect(() => {
    recEngine();
  }, []);

  return (
    <>
    <div>From User: {recommendations.username}</div>
    <div>
    <h2>Movies You Might'nt Hate</h2>
    {recommendations.map(res => <RecCard key={res.id} userObject={res} {...props} />)}
  </div>
  </>
  )
}

export default RecList