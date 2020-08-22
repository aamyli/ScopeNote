import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import "./css/home.css";

export default function Home() {
    //let history = useHistory();
    // goHome() { 
    //   useHistory().push("/");
    // };
    function tabLink() {
        /* eslint-disable no-undef */
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
         function(tabs){
            alert(tabs[0].url);
            var urlTab = tabs[0].url;
            console.log(urlTab);
         }
      );
    }
  
        //this.tabLink();
        return ( 
        <div>
            <h1 className="title">TITLE OF APP</h1>
            <h4 className="intro">Here is an introduction paragraph thingy we can use to introduce our extension.</h4>
            <div className="options">
              <Link to="/vocab">  
                <Button variant="outline-primary">
                  Generate Key Words
                </Button>
              </Link>
            </div>
            <div className="options">
              <Link to="/summary">  
                <Button variant="outline-info">
                  Generate Article Summary
                </Button>
              </Link>
            </div>
        </div>
        )

}
