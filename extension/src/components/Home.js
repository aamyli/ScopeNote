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
        <div className="home">
            <div className="title">
              <img src={require("./assets/ScopeNote.png")} alt="SCOPE NOTE" className="scopenote"/>
            </div>
            <h4 className="intro">Faster. Better. Smarter. </h4>
            <div className="options">
              <Link to="/vocab">  
                <Button variant="outline-warning">
                  Generate Key Words
                </Button>
              </Link>
            </div>
            <div className="options">
              <Link to="/summary">  
                <Button variant="outline-warning">
                  Generate Article Summary
                </Button>
              </Link>
            </div>
            <div className="owl-div">
              <img src={require("./assets/owl.png")} alt="Scotty" className="scotty"/>
              <p className="scotty-talk">
                Hi! I'm Scotty, your favourite study buddy! 
                <br />
                <br />
                Click above to get started!
              </p>
            </div>
        </div>
        )

}
