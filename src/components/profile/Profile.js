import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"
import LoveHates from "./LoveHates"

const Profile = props => {

  const userId = sessionStorage.getItem("userId")

  const [userObjects, setUserObjects] = useState([])

  const getUserMovies = () => {
    return jAPI.userMovieExpand("loveHates", userId)
      .then(loveHates => {
        const pushArr = []
        loveHates.forEach(lh => {
          const displayObject = {
            image: lh.movie.posterPath,
            title: lh.movie.title,
            loveHateId: lh.id
          }
          pushArr.push(displayObject)
        }
        )
        setUserObjects(pushArr)
      }
      )
  }


  // console.log(getUserMovies())
  useEffect(() => {
    getUserMovies();
  }, [])

  return (
    <>
      {userObjects.map(res => <LoveHates key={res.id} userObject={res} {...props} />)}
    </>
  )
}

export default Profile