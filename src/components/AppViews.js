import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login"
import Register from "./auth/Register"

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
        return <Register />
      }}
      />
      <Route
      exact
      path="/"
      render={props=> {
        hasUser ? 
        return 
      }}
      />
    </React.Fragment>
  )
}

export default AppViews