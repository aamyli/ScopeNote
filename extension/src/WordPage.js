import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

export default class Word extends Component {
    //let history = useHistory();
    // goHome() { 
    //   useHistory().push("/");
    // };
    tabLink() {
        /* eslint-disable no-undef */
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
         function(tabs){
            alert(tabs[0].url);
            var urlTab = tabs[0].url;
            console.log(urlTab);
         }
      );
    }
  
    render() {
        this.tabLink();
        return ( 
        <div>
            <h1>ABOUT PAGE TEST</h1>
        </div>
        )
    }
}
