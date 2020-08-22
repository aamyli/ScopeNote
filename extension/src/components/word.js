import React, { Component } from "react";
import "./css/vocab.css";

const Word = (props) => {

  return (
    <div className="word-card">
        <div className="key-word">
            <p className="key-word-p">{props.word}</p>
        </div>
        <div className="definition">
            <p className="definition-p">{props.definition}</p>
        </div>
    </div>
  );
};

export default Word;