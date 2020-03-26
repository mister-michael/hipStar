import React, { useState } from "react";
import jAPI from "../../modules/apiManager";
import { Link } from "react-router-dom"
import { InputGroup, CardFooter, CardHeader, InputGroupAddon, Input, Card } from 'reactstrap';
import "./LoginRegister.css"

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

        const emailArr = credentials.email.split("")
        const emailArrFind = emailArr.find(char => char === "@")

        const nameArr = credentials.username.split("")
        const nameArrFind = nameArr.find(char => char === " ")

        if (nameArrFind !== undefined) {
            window.alert("username can not contain spaces")
        } else if (emailArrFind === undefined) {
            window.alert("please enter a valid email address")
        } else if (nameArr.length > 16) {
            window.alert("username can not be more than 16 characters")

        } else {

            jAPI.get("users").then(users => {

                const name = users.find(user => user.username.toLowerCase() === credentials.username.toLowerCase());
                const email = users.find(user => user.email.toLowerCase() === credentials.email.toLowerCase());

                if (email === undefined && name === undefined) {

                    jAPI.save(credentials, "users");

                    jAPI.get("users").then(users => {

                        const newUser = users.find(newUser => newUser.email.toLowerCase() === credentials.email.toLowerCase());
                        sessionStorage.setItem("userId", newUser.id);
                        props.setUser(credentials);
                        props.history.push("/home");
                    });
                } else if (email !== undefined) {
                    console.log(email)
                    window.alert("email already exists");
                } else if (name !== undefined) {
                    window.alert("username already exists")
                }
            });
        }

    };

    return (<>
        <div className="register" >
            <CardHeader > < h2 > Sign Up </h2></CardHeader >

            <Card className="registerCard" >
                <InputGroup size="sm" >
                    <InputGroupAddon addonType="prepend">
                        username </InputGroupAddon>
                    <Input onChange={handleFieldChange}
                        type="username"
                        id="username"
                        placeholder="full name" />
                </InputGroup> <br />
                <InputGroup size="sm" >
                    <InputGroupAddon addonType="" >
                        e m a i l </InputGroupAddon> <Input addonType="prepend"
                        onChange={handleFieldChange}
                        type="email"
                        id="email"
                        placeholder="email address" />
                </InputGroup> <br />
                <InputGroup size="sm" >
                    <InputGroupAddon addonType="prepend">
                        image url </InputGroupAddon> <Input addonType="prepend"
                        onChange={handleFieldChange}
                        type="imgUrl"
                        id="imgUrl"
                        placeholder="image url" />

                </InputGroup>

                <button className="registerSubmitBtn"
                    type="button"
                    onClick={handleRegister} >
                    <span className="fitInBtn">GO! </span></button>

                <CardFooter >
                    < div className="rightAlign smallText" >
                        <Link to="/login" className="signLink" style={{ textDecoration: 'none' }} >
                            already a user ?</Link>
                    </div>
                </CardFooter >
            </Card>
        </div> {
            /* <div className="loginForm">
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
                  </div> */
        } </>
    );
};

export default RegisterForm;