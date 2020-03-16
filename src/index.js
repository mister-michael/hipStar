import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import HipStar from "./components/HipStar"
import './index.css';


ReactDOM.render(
    <Router>
    <HipStar/>
    </Router>,
     document.getElementById('root')
);