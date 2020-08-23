/* global chrome */
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
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
      let urlTab
        /* eslint-disable no-undef */
        chrome.tabs.getCurrent(tab => urlTab = tab)
        /* eslint-enable no-undef */
        return urlTab
      //   chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
      //    function(tabs){
      //       alert(tabs[0].url);
      //       urlTab = tabs[0].url;
      //       console.log(urlTab);
      //    }
      // );
    } 
    
  
    let vocab;
    let summary;
    
    const genNotes = () => {
      // let link = 'http://www.topsprogram.ca/all-the-worlds-a-stage/'
      let link = 'https://www.bbc.com/future/article/20200819-why-plastic-waste-is-an-ideal-building-material'
      console.log(link)
      axios.get('http://127.0.0.1:5000/link/' + link)
      //   .then(res => {
      //     console.log("received")
      //     console.log(res.data['vocab'])
            
      //   })
      console.log('make get request')
    }

        //this.tabLink();
        return ( 
        <div className="home">
            <div className="refresh">
              <Link to='/vocab' onClick={genNotes}>
                <Button variant='outline-light'>
                  Refresh
                </Button>
              </Link>
            </div>
            <div className="title">
              <img src={require("./assets/ScopeNote NEW.png")} alt="SCOPE NOTE" className="scopenote"/>
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
            <div className="options">

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
