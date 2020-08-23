// ALL CONTENT EDITABLE THINGS HERE
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import ContentEditable from 'react-contenteditable'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from 'react-collapsible';
import "./css/collapsible.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


export default class VocabList extends Component {
    
  
    // constructor(props) {
    //   super(props);
    //   this.test = [];
    //   this.store = [
    //     {
    //       word: '',
    //       definition: '',
    //       note: ''
    //     }
    //   ];
    //   this.row = [
    //     {
    //       word: "Add word",
    //       definition: "Add definition",
    //       note: "Add notes"
    //     }
    //   ]
    // }
    // tabLink = () => {
    //   /* eslint-disable no-undef */
    //   chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    //    function(tabs){
    //       alert(tabs[0].url);
    //       var urlTab = tabs[0].url;
    //       return urlTab;
    //    }
    // );
    //   }

    constructor(props) {
      super(props);

      this.state = {
          loop: 0,
          // urlTab: tabLink(),
          test: [],
          store: [
            { id: 1, word: 'Vocabulary Word', definition: 'The definition is here', note: 'You can add extra notes!' },
          ],
          row: {
            word: 'Add Word',
            definition: 'Add Definition',
            note: 'Add Notes'
          },
        }
    }


  
      // this.state = {
      //   test: [],
      //   store: [
      //     { id: 1, word: 'hello', definition: 'this is the definition', note: 'extra notes' },
      //     { id: 2, word: 'word2', definition: 'this is the definition!', note: 'xx' },
      //   ],
      //   row: {
      //     word: 'Add Word',
      //     definition: 'Add Definition',
      //     note: 'Add Notes'
      //   },
      // }

      // state = this.initialState
      firstEditable = React.createRef()

      // i'm stuck here
      componentDidMount() {
        // this.getVocab();
        axios.get('http://127.0.0.1:5000/link/https://theconversation.com/why-companies-were-so-quick-to-endorse-black-lives-matter-142532')
          .then(response => response.data)
          .then(response => {this.setState({
              test: response.vocab
              })
              console.log(this.state.test),
              this.state.loop = this.state.loop+1,
              console.log(this.state.loop),
              this.saveVocab()
            })
          .then(
            console.log("WHUE"),
            console.log(this.state.test),

            console.log("HERELSL")
          )
          // .then(this.saveVocab())
          console.log(this.state.test);
          console.log(this.state.store);
            
            // console.log(response)
            
          
        //this.saveVocab();
        
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevState.loop !== this.state.loop && this.state.loop < 2) {
        //   console.log(this.state.store.length);
        //   this.saveVocab();
        //   this.state.loop = this.state.loop+1;
        // }
      }
      

      //   console.log("here")
      //   axios.get('http://127.0.0.1:5000/link/http://www.topsprogram.ca/all-the-worlds-a-stage/')
      //     .then(response => response.data)
      //     .then(response => this.setState({
      //       temp = response.vocab
      //     })

      //     )
      //   console.log(temp);

      // }
            
      // getVocab = () => {
      //   for (let i = 0; i < 10; i++) {
      //     const response =  axios.get('http://127.0.0.1:5000/link/http://www.topsprogram.ca/all-the-worlds-a-stage/');
      //     this.setState( {
      //       keepAll: [...this.state.store, response.data]
      //       // dogImages: [...this.state.dogimages, response.data]
      //     }
      //     )
          
      //   }
      // } 
      
      saveVocab = () => {
        console.log("THISSTATE HERE");
        console.log(this.state.test);
        for (let i = 0; i < 8; i++) {
          this.state.store.push({
            id: i+3,
            word: this.state.test[i].word,
            definition: this.state.test[i].definition,
            note: this.state.test[i].note
          })
        }
        console.log(this.state.store);
      }

      // saveVocab = () => {
      //   console.log("SAVE VOCAB");
      //   console.log(this.state.test);
      //   for (let i = 0; i < 10; i++) {
      //     const toAdd = {
      //       id: i + 3,
      //       word: this.state.test.word,
      //       definition: this.test.definition,
      //       note: this.test.note
      //     };
      //     this.setState({store: [...this.state.store, toAdd]});
      //     console.log(this.store);
      //     this.store.push({
      //       id: i+3,
      //       word: this.test.word,
      //       definition: this.test.definition,
      //       note: this.test.note
      //     })
      //   }
      //   console.log(this.store);
      // }
      

      

    
      addRow = () => {
        const { store, row } = this.state
        const trimSpaces = string => {
          return string
            .replace(/&nbsp;/g, '')
            .replace(/&amp;/g, '&')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
        }
        const trimmedRow = {
          ...row,
          word: trimSpaces(row.word),
        }
    
        row.id = store.length + 1
    
        this.setState({
          store: [...store, trimmedRow],
          row: this.state.row,
        })
    
        this.firstEditable.current.focus()
      }
    
      deleteRow = id => {
        const { store } = this.state
    
        this.setState({
          store: store.filter(word => id !== word.id),
        })
      }
    
    //   disableNewlines = event => {
    //     const keyCode = event.keyCode || event.which
    
    //     if (keyCode === 13) {
    //       event.returnValue = false
    //       if (event.preventDefault) event.preventDefault()
    //     }
    //   }
    
    //   validateNumber = event => {
    //     const keyCode = event.keyCode || event.which
    //     const string = String.fromCharCode(keyCode)
    //     const regex = /[0-9,]|\./
    
    //     if (!regex.test(string)) {
    //       event.returnValue = false
    //       if (event.preventDefault) event.preventDefault()
    //     }
    //   }
    
      pasteAsPlainText = event => {
        event.preventDefault()
    
        const text = event.clipboardData.getData('text/plain')
        document.execCommand('insertHTML', false, text)
      }
    
      highlightAll = () => {
        setTimeout(() => {
          document.execCommand('selectAll', false, null)
        }, 0)
      }
    
      handleContentEditable = event => {
        const { row } = this.state
        const {
          currentTarget: {
            dataset: { column },
          },
          target: { value },
        } = event
    
        this.setState({ row: { ...row, [column]: value } })
      }
    
      handleContentEditableUpdate = event => {
        const { store } = this.state
    
        const {
          currentTarget: {
            dataset: { row, column },
          },
          target: { value },
        } = event
    
        let updatedRow = store.filter((word, i) => parseInt(i) === parseInt(row))[0]
        updatedRow[column] = value
    
        this.setState({
          store: store.map((word, i) => (word[column] === row ? updatedRow : word)),
        })
      }

    
      render() {
        const {
          store,
          row: { word, definition, note },
        } = this.state
    
        return (
          <div className="Vocab">
              <div className="header">
                <Link to="/">    
                    <img src={require("./assets/arrow.png")} alt="back" className="back-button"/>
                </Link>
                <h1>Key Words</h1>
            </div>
              <div>
                {store.map((row, i) => {
                  return (
                    <div className="word-div" key={row.id}>
                        <Collapsible trigger={row.word} className="collapsible">
                            <ContentEditable
                            html={row.definition}
                            data-column="definition"
                            data-row={i}
                            className="content-editable"
                            //   onKeyPress={this.validateNumber}
                            onPaste={this.pasteAsPlainText}
                            onFocus={this.highlightAll}
                            onChange={this.handleContentEditableUpdate}
                            />

                            <ContentEditable
                            html={row.note}
                            data-column="note"
                            data-row={i}
                            className="content-editable"
                            //   onKeyPress={this.validateNumber}
                            onPaste={this.pasteAsPlainText}
                            onFocus={this.highlightAll}
                            onChange={this.handleContentEditableUpdate}
                            />

                            <Button className="delete-button" variant="light"
                            onClick={() => {
                                this.deleteRow(row.id)
                            }}
                            >
                            Delete
                            </Button>
                        </Collapsible>


                        {/* <ContentEditable
                          html={row.word}
                          data-column="word"
                          data-row={i}
                          className="content-editable"
                        //   onKeyPress={this.disableNewlines}
                          onPaste={this.pasteAsPlainText}
                          onFocus={this.highlightAll}
                          onChange={this.handleContentEditableUpdate}
                        /> */}
                    </div>
                  )
                })}
                <div className="addWord">

                    <ContentEditable
                      html={word}
                      data-column="word"
                      className="content-editable"
                      innerRef={this.firstEditable}
                    //   onKeyPress={this.disableNewlines}
                      onPaste={this.pasteAsPlainText}
                      onFocus={this.highlightAll}
                      onChange={this.handleContentEditable}
                    />

                    <ContentEditable
                      html={definition}
                      data-column="definition"
                      className="content-editable"
                    //   onKeyPress={this.validateNumber}
                      onPaste={this.pasteAsPlainText}
                      onFocus={this.highlightAll}
                      onChange={this.handleContentEditable}
                    />

                    <ContentEditable
                      html={note}
                      data-column="note"
                      className="content-editable"
                    //   onKeyPress={this.validateNumber}
                      onPaste={this.pasteAsPlainText}
                      onFocus={this.highlightAll}
                      onChange={this.handleContentEditable}
                    />

                    <Button className="add-button" variant="light" disabled={!word || !definition} onClick={this.addRow}>
                      Add
                    </Button>

                </div>
            </div>
          </div>
        )
      }
    }