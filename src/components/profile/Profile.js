import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"
import LoveHates from "./LoveHates"

const Profile = props => {

  const userId = props.userId

  const [userObject, setUserObject] = useState([])
  const [loveState, setLoveState] = useState([])
  const [hateState, setHateState] = useState([])

  const getUserObject = (id) => {
    return jAPI.getWithId("users", id)
      .then(user => setUserObject(user))
  }

  const getUserMovies = () => {
    return jAPI.userMovieExpand("loveHates", userId)
      .then(loveHates => {
        const loveArr = []
        const hateArr = []
        loveHates.forEach(lh => {
          // const displayObject = {
          //   image: lh.movie.posterPath,
          //   title: lh.movie.title,
          //   loveHateId: lh.id
          // }
          if (lh.isHated !== true) {
            loveArr.push(lh)
          } else {
            hateArr.push(lh)
          }
        })
        setLoveState(loveArr)
        setHateState(hateArr)
      })
  }

  useEffect(() => {
    getUserObject(userId);
    getUserMovies();
  }, [])

  return (
    <>
      <div id={`profile--${userObject.id}`}>
        {/* <img className="profileImage" src={userObject.imgUrl} /> */}
        <div id={`name--${userObject.id}`}>{userObject.username}</div>
      </div>
      <div id={`hate--${userObject.id}`}>
        <h2>HATE</h2>
        {hateState.map(res => <LoveHates key={res.id} loveHateObject={res} getUserMovies={getUserMovies} getUserObject={getUserObject} {...props} />)}
      </div>
      <div id={`love--${userObject.id}`}>
        <h2>LOVE</h2>
        {loveState.map(res => <LoveHates key={res.id} loveHateObject={res} getUserMovies={getUserMovies} getUserObject={getUserObject} {...props} />)}
      </div>
    </>
  )
}

export default Profile