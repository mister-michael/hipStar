import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"

const Profile = props => {

  const userId = sessionStorage.getItem("userId")

  const [userObject, setUserObject] = useState([])

  const getUser = () => {
    jAPI.embedWithId("users", userId, "loveHates")
      .then(user => {
        setUserObject(user)
      })
  }


  getUser()
  useEffect(() => {
  }, [])

  return (
    <>
      <div id="profile" className="profile">
        <img src={userObject.imgUrl} />
        <div id="profileName" className="profileName">{userObject.username}</div>
      </div>
      <div id="lists" className="lists">
        <div id="dislikeList">
          <ul>
            <li></li>
            <li>movie2</li>
            <li>movie3</li>
            <li>movie4</li>
          </ul>
        </div>
        <div id="likeList">
          <ul>
            <li>movie1</li>
            <li>movie1</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Profile