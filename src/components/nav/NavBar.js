import React from "react";
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
// import "./NavBar.css"
import API from "../../modules/apiManager"

//if the Navbar prop hasUser exists ( there is a user ) render the nav bar
const NavBar = props => {

  const userId = parseInt(sessionStorage.getItem("userId"))

  const handleLogout = () => {
    // const logoutTime = Date.now()
    // const logoutObject = {logoutTime: logoutTime}
    // API.patch(logoutObject, "users", userId)
    props.clearUser()
    props.history.push("/login")
  }

  return (
    <nav>
      {props.hasUser ? (
        <ul className="navList">
          <li>
            <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/search">
              Search
            </Link>
          </li>

          {/* <li>
                        <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/messages">
                            Messages
            </Link>
                    </li>
                    <li>
                        <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/friendships">
                            Friends
            </Link>
                    </li>
                    <li>
                        <Link className="nav-link" style={{ textDecoration: 'none', color: '#160D58' }} to="/articles">
                            Articles
            </Link>
                    </li> */}
          <li>
            <span className="nav-link" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </span>
          </li>
        </ul>
      ) : null}
    </nav>
  )
}

export default withRouter(NavBar)
