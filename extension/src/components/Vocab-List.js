// ALL CONTENT EDITABLE THINGS HERE
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import ContentEditable from 'react-contenteditable'
import { Table, Button } from 'semantic-ui-react'
import Collapsible from 'react-collapsible';
import "./css/collapsible.css";


export default class VocabList extends Component {
    initialState = {
        store: [
          { id: 1, word: 'hello', definition: 'this is the definition', note: 'extra notes' },
          { id: 2, word: 'word2', definition: 'this is the definition!', note: 'xx' },
        ],
        row: {
          word: 'Add Word',
          definition: 'Add Definition',
          note: 'Add Notes'
        },
      }

      state = this.initialState
      firstEditable = React.createRef()

      // im trying like this
      componentDidMount() {
        console.log("here")
        axios.get('http://127.0.0.1:5000/vocab')
          .then(
            console.log("received")
          )
      }
    
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
          row: this.initialState.row,
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
          <div className="App">
              <div>
                {store.map((row, i) => {
                  return (
                    <div key={row.id}>
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

                            <Button
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

                    <Button disabled={!word || !definition} onClick={this.addRow}>
                      Add
                    </Button>

                </div>
            </div>
          </div>
        )
      }
    }