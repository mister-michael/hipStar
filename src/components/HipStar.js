import React, { useState } from "react"
import AppViews from "./AppViews"
import NavBar from "./nav/NavBar"

const HipStar = (props) => {

  const isAuthenticated = () => sessionStorage.getItem("userId") !== null; //begins with null credentials when function is called
  const [hasUser, setHasUser] = useState(isAuthenticated()); //begins with initial state of null

  const setUser = (user) => {
    sessionStorage.setItem("credentials", JSON.stringify(user));
    setHasUser(isAuthenticated()); //changing state to setting user
  }

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated()); //changing state after clearing session storage
  }

  return (
    <>
      <NavBar setUser={setUser} hasUser={hasUser} clearUser={clearUser} {...props}/>
      <AppViews setUser={setUser} hasUser={hasUser} {...props} />
    </>
  )
}

export default HipStar