import React, { useState } from "react";
import { Route, Link } from "react-router-dom"
import jAPI from "../../modules/ApiManager"

const Login = props => {
  const [credentials, setCredentials] = useState({ email: ""}); 
  const [linkColor, setLinkColor] = useState()

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };
  const handleLogin = (evt) => {
    jAPI.get("users")
      .then(users => {
        const user = users.find(user => user.email === credentials.email.toLowerCase())
        if (user !== undefined) {
          sessionStorage.setItem("userId", user.id)
          props.setUser(credentials)
          props.history.push("/")
        } else {
          window.alert("try again")
        }
      })
  };

  return (
    <>
      <div className="loginForm">
        <div>
          <h3>Sign in</h3>
          <label htmlFor="inputEmail">Email Address: </label>
          <input
            onChange={handleFieldChange}
            type="email"
            id="email"
            placeholder="email address"
          ></input>

          {/* <label htmlFor="inputPassword">Password:</label>
          <input
            onChange={handleFieldChange}
            type="password"
            id="password"
            placeholder="password"
          ></input> */}

          <button
            type="submit"
            onClick={handleLogin}
          >Submit</button>
          <p>Don't have an account? <span></span>
            <Link to="/register" style={{ textDecoration: 'none' }} className="signLink" >
              Sign up
            </Link> </p>

        </div>
      </div>
    </>
  );
};

export default Login;
