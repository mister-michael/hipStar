import React, { useState, useEffect } from "react"
import jAPI from "../../modules/apiManager"
import LoveHates from "./LoveHates"
import RecList from "../rec/RecList"
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';


const Profile = props => {

  const activeUserId = props.userId

  const [userObject, setUserObject] = useState([])
  const [loveState, setLoveState] = useState([])
  const [hateState, setHateState] = useState([])
  const [recUpdated, setRecUpdated] = useState(false)

  const getUserObject = (id) => {
    return jAPI.getWithId("users", id)
      .then(user => setUserObject(user))
  }

  const getUserMovies = () => {
    return jAPI.userMovieExpand("loveHates", activeUserId)
      .then(loveHates => {
        const loveArr = []
        const hateArr = []
        loveHates.forEach(lh => {
          
          if (lh.isHated !== true) {
            loveArr.push(lh)
          } else {
            hateArr.push(lh)
          }
        })
        setLoveState(loveArr)
        setHateState(hateArr)
      })
  }

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  useEffect(() => {
    getUserObject(activeUserId);
    getUserMovies();
  }, [recUpdated])

  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              HATES
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              LOVES
          </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              RECS
          </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <h2 className="headline headlineGreen headlineTextWhite">HATES</h2>
            <div className="marginTop">
              <div id={`hate--${userObject.id}`} className="cardGroup">

                {hateState.map(res => <LoveHates key={res.id} loveHateObject={res} getUserMovies={getUserMovies} getUserObject={getUserObject} userId={activeUserId} recUpdated={recUpdated} setRecUpdated={setRecUpdated} {...props} />)}
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <h2 className="headline headlineRed headlineTextWhite">LOVES</h2>
            <div id={`love--${userObject.id}`} className="cardGroup">

              {loveState.map(res => <LoveHates key={res.id} loveHateObject={res} getUserMovies={getUserMovies} getUserObject={getUserObject} userId={activeUserId} recUpdated={recUpdated} setRecUpdated={setRecUpdated} {...props} />)}
            </div>
          </TabPane>
          {/* <TabPane tabId="3">
            <div>
              <RecList activeUserId={activeUserId} getUserMovies={getUserMovies} getUserObject={getUserObject}  recUpdated={recUpdated} setRecUpdated={setRecUpdated}></RecList>
            </div>
          </TabPane> */}
        </TabContent>
      </div>


    </>
  )
}

export default Profile