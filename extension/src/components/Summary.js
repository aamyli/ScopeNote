import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import "./css/summary.css";
import Word from "./word";


export default function Summary() {
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
        <div className="Summary">
            <div className="header">
                <Link to="/">    
                    <img src={require("./assets/arrow.png")} alt="back" className="back-button"/>
                </Link>
                <h1>Summary</h1>
            </div>
            <div className="phrases">
                <ul>
                    <li>this is a point</li>
                </ul>
            </div>
            
        </div>
        )
}
