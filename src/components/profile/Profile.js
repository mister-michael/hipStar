import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"
import LoveHates from "./LoveHates"
import { userInfo } from "os"

const Profile = props => {

  const userId = sessionStorage.getItem("userId")

  const [userObject, setUserObject] = useState([])
  const [loveState, setLoveState] = useState([])
  const [hateState, setHateState] = useState([])

  const getUserObject = () => {
    return jAPI.getWithId("users", userId)
      .then(user => setUserObject(user))
  }
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
    getUserObject();
    getUserMovies();
  }, [])

  return (
    <>
      <div id={`profile--${userObject.id}`}>
        <img className="loveHateImage" src={userObject.imgUrl} />
        <div id={`name--${userObject.id}`}>{userObject.username}</div>
      </div>
      <div id={`love--${userObject.id}`}>
        <h2>LOVE</h2>
        {loveState.map(res => <LoveHates key={res.loveHateId} userObject={res} {...props} />)}
      </div>
      <div id={`hate--${userObject.id}`}>
        <h2>HATE</h2>
        {hateState.map(res => <LoveHates key={res.loveHateId} userObject={res} {...props} />)}
      </div>
    </>
  )
}

export default Profile