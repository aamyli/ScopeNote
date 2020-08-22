import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Word from "./WordPage";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">    
                {/* <Button variant="contained" color="primary" onClick={getCurrentURL()}> */}
                <Button variant="contained" color="primary">
                  Home
                </Button>
              </Link>
            </li>
            <li>
                <Button variant="contained" color="primary" onClick={Test()}>
                  About
                </Button>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Test() {
  console.log("TEST")
  console.log(window.location.href);
  console.log("Hello");
}
// var currentURL;

// chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, 
// function(tabs){
// 	getCurrentURL(tabs[0].url);
// });

// function getCurrentURL(tab){
// 	currentURL = tab;
// }
