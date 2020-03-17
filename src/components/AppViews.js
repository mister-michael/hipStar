import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login"
import Register from "./auth/Register"
import Home from "./home/Home"
import Profile from "./profile/Profile"
import Search from "./search/Search"

const AppViews = (props) => {
const setUser = props.setUser
const hasUser = props.hasUser

  return (
    <React.Fragment>
      <Route
        exact
        path="/login"
        render={props => {
          return <Login setUser={setUser} hasUser={hasUser} {...props}/>;
        }}
      />
      <Route
      exact
      path="/register"
      render={props=> {
        return <Register setUser={setUser} hasUser={hasUser} {...props}/>
      }}
      />
      <Route
      exact
      path="/"
      render={props=> {
      if (hasUser) {return <Profile /> } else {return <Redirect to="/login"/>}
      }}
      />
      <Route
      exact
      path="/search"
      render={props=> {
        if (hasUser) {return <Search {...props}/>} else {return <Redirect to="/login" />}
      }}
      />
    </React.Fragment>
  )
}

export default AppViews