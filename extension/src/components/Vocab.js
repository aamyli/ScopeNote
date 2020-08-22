import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import "./css/vocab.css";
import Word from "./word";







export default function Vocab() {
    //let history = useHistory();
    // goHome() { 
    //   useHistory().push("/");
    // };
    // tabLink() {
    //     /* eslint-disable no-undef */
    //     chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    //      function(tabs){
    //         alert(tabs[0].url);
    //         var urlTab = tabs[0].url;
    //         console.log(urlTab);
    //      }
    //   );
    // }
  

        //this.tabLink();
        return ( 
        <div>
            <div className="header">
                <Link to="/">    
                    <img src={require("./assets/arrow.png")} alt="back" className="back-button"/>
                </Link>
                <h1>Key Words</h1>
            </div>
            {/* <div className="words">
                <Word word="keyword" definition="this is the definition of the keyword"></Word>
            </div> */}
            
        </div>
        )
}
