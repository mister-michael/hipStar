import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import "./NavBar.css"
import {
  Collapse, Navbar, NavbarToggler,  NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';

const NavBar = props => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // const userId = parseInt(sessionStorage.getItem("userId"))

  const handleLogout = () => {
    // const logoutTime = Date.now()
    // const logoutObject = {logoutTime: logoutTime}
    // API.patch(logoutObject, "users", userId)
    props.clearUser()
    props.history.push("/login")
  }

  useEffect(() => {

  }, [])
  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">H P S T R</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/home">
                Home
            </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/profile">
                Profile
            </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/search">
                Search
            </Link>
            </NavItem>
            <NavItem><Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/recommendations">
              Recs
            </Link></NavItem>
            <NavItem><Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/recommendations">
              Friends
            </Link></NavItem>
            <NavItem></NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <NavbarText>making unpopular opinions popular again</NavbarText>
        </Collapse>
      </Navbar>
    </>
  )
}

export default withRouter(NavBar)
