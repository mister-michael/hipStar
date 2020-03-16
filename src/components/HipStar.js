import React, {useState} from "react"
import AppViews from "./AppViews"

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
      <AppViews setUser={setUser} hasUser={hasUser} {...props} />
    </>
  )
}

export default HipStar