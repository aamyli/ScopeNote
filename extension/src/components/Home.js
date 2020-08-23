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
  
    let vocab;
    let summary;

    const findNotes = () => {
      // axios.get('localhost:5000/db')
      //   .then(res => {
      //     console.log('found existing notes')
      //     data = res.data
      //     vocab = data['vocab']
      //     summary = data['summary']
      //   })
      console.log('findnotes')
    }
    
    const genNotes = () => {
      let link = 'http://www.topsprogram.ca/all-the-worlds-a-stage/'
      // axios.get('http://127.0.0.1:5000/link/' + link)
      //   .then(res => {
      //     console.log("received")
      //     console.log(res.data['vocab'])
            
      //   })
      console.log('make get request')
    }

        //this.tabLink();
        return ( 
        <div className="home">
            <div className="title">
              <img src={require("./assets/ScopeNote.png")} alt="SCOPE NOTE" className="scopenote"/>
            </div>
            <h4 className="intro">Faster. Better. Smarter. </h4>
            <div className="options">
              <Link to="/vocab" onClick={findNotes}>  
                <Button variant="outline-warning">
                  Generate Key Words
                </Button>
              </Link>
              <Link to='/vocab' onClick={genNotes}>
                <Button variant='outline-warning'>
                  Refresh
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
