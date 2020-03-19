import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"
import LoveHates from "./LoveHates"

const Profile = props => {

  const userId = sessionStorage.getItem("userId")

  const [loveState, setLoveState] = useState([])
  const [hateState, setHateState] = useState([])

  const getUserMovies = () => {
    return jAPI.userMovieExpand("loveHates", userId)
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
        }
        )
        setLoveState(loveArr)
        setHateState(hateArr)
      }
      )
  }


  // console.log(getUserMovies())
  useEffect(() => {
    getUserMovies();
  }, [])

  return (
    <>
    <h2>LOVE</h2>
      {loveState.map(res => <LoveHates key={res.loveHateId} userObject={res} {...props} />)}
      <h2>HATE</h2>
      {hateState.map(res => <LoveHates key={res.loveHateId} userObject={res} {...props} />)}

    </>
  )
}

export default Profile