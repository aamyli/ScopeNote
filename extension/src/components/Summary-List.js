// ALL CONTENT EDITABLE THINGS HERE
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ContentEditable from 'react-contenteditable'
import Button from 'react-bootstrap/Button';
import { Table } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Collapsible from 'react-collapsible';
import "./css/collapsible.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class SummaryList extends Component {
    initialState = {
        store: [
            { id: 1, point: "Main point 1", note: 'extra notes'},
            { id: 2, point: "Main point 2", note: 'extra notes'},
        ],
        row: {
            point: 'Add point here',
            note: 'Add Notes'
        },
      }
    
      init = () => {    
        console.log('iniat')
        console.log(this.state.store)    
        axios.get('http://127.0.0.1:5000/summary')
          .then(res => {
            this.setState(res.data)
          })  
      }
      
      state = this.initialState
      firstEditable = React.createRef()
    
      componentDidMount() {
        // console.log("didmount")
        // let link = 'http://www.topsprogram.ca/all-the-worlds-a-stage/'
        // axios.get('http://127.0.0.1:5000/link/' + link)
        //   .then(res => {
        //     console.log("received")
        //     console.log(res.data['vocab'])
            
        //   })
        // axios.get('http://localhost:5000/summary')
        //   .then(res => {
        //     this.state = res.data
        //     console.log(res.data)
        //   })
        this.init()
      }

      componentDidUpdate(prevProps, prevState, snapshot) {}

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
           point: trimSpaces(row.point),
         }
    
        row.id = store.length + 1
    
        this.setState({
            store: [...store, trimmedRow],
            row: this.initialState.row,
        })
    
        this.firstEditable.current.focus()
      }
    
      deleteRow = id => {
        const { store } = this.state
    
        this.setState({
          store: store.filter(point => id !== point.id),
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
    
        let updatedRow = store.filter((point, i) => parseInt(i) === parseInt(row))[0]
        updatedRow[column] = value
    
        axios.put(('http://127.0.0.1:5000/summary'),
          {store: store}
        )

        this.setState({
          store: store.map((point, i) => (point[column] === row ? updatedRow : point)),
        })
      }

    
      render() {
        const {
          store,
          row: { point, note },
        } = this.state
    
        return (
          <div className="Summary">
            <div className="header">
                <Link to="/">    
                    <img src={require("./assets/arrow.png")} alt="back" className="back-button"/>
                </Link>
                <h1>Summary</h1>
            </div>
              <div>
                {store.map((row, i) => {
                  return (
                    <div className="point-div" key={row.id}>
                        <Collapsible trigger={row.point} className="collapsible">
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
                          html={row.point}
                          data-column="point"
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
                <div className="addPoint">

                    <ContentEditable
                      html={point}
                      data-column="point"
                      className="content-editable"
                      innerRef={this.firstEditable}
                    //   onKeyPress={this.disableNewlines}
                      onPaste={this.pasteAsPlainText}
                      onFocus={this.highlightAll}
                      onChange={this.handleContentEditable}
                        />

                    <ContentEditable
                        html={note}
                        data-column="note"
                        className="content-editable"
                        //   onKeyPress={this.disableNewlines}
                        onPaste={this.pasteAsPlainText}
                        onFocus={this.highlightAll}
                        onChange={this.handleContentEditable}
                    />


                    <Button className="add-button" variant="light" disabled={!point || !note} onClick={this.addRow}>
                            Add
                    </Button>

                </div>
            </div>
          </div>
        )
      }
    }