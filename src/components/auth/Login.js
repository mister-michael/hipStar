import React, { useState } from "react";
import { Route, Link } from "react-router-dom"
import jAPI from "../../modules/apiManager"
import {
  Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, InputGroup, InputGroupAddon, InputGroupText, Input,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const Login = props => {
  const [credentials, setCredentials] = useState({ input: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [symbol, setSymbol] = useState({ symbol: "@", placeholder: "username" })

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const handleAt = () => {
    setSymbol({ symbol: "@", placeholder: "username" })
  }

  const handleEmail = () => {
    setSymbol({ symbol: "email", placeholder: "email" })
  }

  const handleFieldChange = evt => {
      const stateToChange = { ...credentials };
      stateToChange[evt.target.id] = evt.target.value.toLowerCase();
      setCredentials(stateToChange);
  };
  const handleLogin = (evt) => {
    jAPI.get("users")
      .then(users => {
        const user = users.find(user => (user.email.toLowerCase() === credentials.input.toLowerCase()) || (user.username.toLowerCase() === credentials.input.toLocaleLowerCase()))
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
      <div>
        <Card>
          <CardHeader>hipStar</CardHeader>
          <CardBody>
            <CardTitle>sign in with {symbol.placeholder}</CardTitle>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                  <DropdownToggle caret>
                    {symbol.symbol}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      id="atDropDown"
                      onClick={handleAt}
                    >@</DropdownItem>
                    <DropdownItem
                      id="emailDropDown"
                      onClick={handleEmail} >email</DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
              </InputGroupAddon>
              <Input
                placeholder={symbol.placeholder}
                onChange={handleFieldChange}
                type="input"
                id="input" />
              <InputGroupAddon addonType="append">
                <Button
                  onClick={handleLogin}>sign in</Button>
              </InputGroupAddon>
            </InputGroup>
            <span></span>
            <CardTitle><span></span>
              <Link to="/register" style={{ textDecoration: 'none' }} className="signLink" >
                Don't Have an Account?
            </Link>
            </CardTitle>
          </CardBody>
          <CardFooter> </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
