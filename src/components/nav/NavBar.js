import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import "./NavBar.css"
import {
  Collapse, Navbar, NavbarToggler,  NavbarBrand, Nav, NavItem
} from 'reactstrap';

const NavBar = props => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    props.clearUser()
    props.history.push("/login")
  }

  useEffect(() => {
  }, [])

  return (
    <>
    {props.hasUser ? (
      <Navbar color="light" light expand="md" className="headlineShadow">
        <NavbarBrand href="/hpstr">H ! P S T @ R</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/home">
                home
            </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/profile">
                profile
            </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/search">
                search
            </Link>
            </NavItem>
            <NavItem><Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/recommendations">
              recs
            </Link></NavItem>
            {/* <NavItem><Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/recommendations">
              friends
            </Link></NavItem> */}
            <NavItem></NavItem>
            <NavItem>
              <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/login" onClick={handleLogout}>
                logout
            </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    ) : null}
    </>
  )
}

export default withRouter(NavBar)
