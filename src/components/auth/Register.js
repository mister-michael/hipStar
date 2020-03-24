import React, { useState } from "react";
import jAPI from "../../modules/apiManager";
import { Link } from "react-router-dom"
import { InputGroup, InputGroupText, InputGroupAddon, Input, Card } from 'reactstrap';

const RegisterForm = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    imgUrl: "",
    logoutTime: ""
  });


  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleRegister = evt => {
    evt.preventDefault();
    setCredentials("credentials")

    const nameArr = credentials.username.split("")
    const nameArrFind = nameArr.find(char => char === " ")

    if (nameArrFind !== undefined) {
      window.alert("username can not contain spaces")

    } else if (nameArr.length > 16) {
      window.alert("username can not be more than 16 characters")

    } else {

      jAPI.get("users").then(users => {

        const email = users.find(user => user.email.toLowerCase() === credentials.email.toLowerCase());
        const name = users.find(user => user.username.toLowerCase() === credentials.username.toLowerCase());

        if (email === undefined && name === undefined) {

          setCredentials("credentials");
          jAPI.save(credentials, "users");
          jAPI.get("users").then(users => {
            const newUser = users.find(newUser => newUser.email === credentials.email);
            sessionStorage.setItem("userId", newUser.id);
            props.setUser(credentials);
            props.history.push("/home");
          });
        }
        else if (email !== undefined) {
          window.alert("email already exists");
        }
        else if (name !== undefined) {
          window.alert("username already exists")
        }
      });
    }
  };

  return (
    <>
      <div>
        <h2>Sign Up</h2>
        <Card className="registerCard">
          <InputGroup size="sm">
            <InputGroupAddon
              addonType="prepend"
              onChange={handleFieldChange}
              type="username"
              id="username"
              placeholder="full name">username</InputGroupAddon>
            <Input />
          </InputGroup>
          <br />
          <InputGroup size="sm">
            <InputGroupAddon
              addonType="prepend"
              onChange={handleFieldChange}
              type="email"
              id="email"
              placeholder="email address">e m a i l</InputGroupAddon>
            <Input />
          </InputGroup>
          <br />
          <InputGroup size="sm">
            <InputGroupAddon
              addonType="prepend"
              onChange={handleFieldChange}
              type="imgUrl"
              id="imgUrl"
              placeholder="image url">image url</InputGroupAddon>
            <Input />
          </InputGroup>
          <div className="rightAlign smallText">
            <Link to="/login" className="signLink" style={{ textDecoration: 'none' }} >
              already a user?
          </Link>
          </div>
        </Card>
      </div>
      {/* <div className="loginForm">
        <div>
          <h3>Sign up</h3>
          <label htmlFor="inputName">Name:</label>
          <input
            onChange={handleFieldChange}
            type="username"
            id="username"
            placeholder="full name"
          ></input>

          <label htmlFor="inputEmail">Email Address:</label>
          <input
            onChange={handleFieldChange}
            type="email"
            id="email"
            placeholder="email address"
          ></input>

          <label htmlFor="inputImgUrl">Image Url:</label>
          <input
            onChange={handleFieldChange}
            type="imgUrl"
            id="imgUrl"
            placeholder="image url"
          ></input>

          <button type="button" onClick={handleRegister}>
            Submit
          </button>

          Already a user? <span></span>
          <Link to="/login" className="signLink" style={{ textDecoration: 'none' }} >

            Click here
          </Link>

        </div>
      </div> */}
    </>
  );
};

export default RegisterForm;
