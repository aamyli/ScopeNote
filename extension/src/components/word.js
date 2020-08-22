// IGNORE FILE FOR NOW
import React, { Component } from "react";
import "./css/vocab.css";

const Word = (props) => {

    // mySubmitHandler = (event) => {
    //     event.preventDefault();
    //     alert("You are submitting " + this.state.username);
    //   }
    // myChangeHandler = (event) => {
    // this.setState({username: event.target.value});
    // }
    
  return (
    <div className="word-card">
        <div className="key-word">
            <p className="key-word-p">{props.word}</p>
        </div>
        <div className="definition">
            <p className="definition-p">{props.definition}</p>
        </div>
        {/* <form onSubmit={this.mySubmitHandler}>
            <h1>Hello {this.state.username}</h1>
            <p>Enter your name, and submit:</p>
            <input
                type='text'
                onChange={this.myChangeHandler}
            />
            <input
                type='submit'>Save</input>
        </form> */}
    </div>
  );
};

export default Word;