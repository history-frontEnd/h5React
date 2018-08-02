import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Page0 extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Page01</h1>
        </header>
        <div><a href="./page0.html">page0</a></div>
        <div><a href="./page1.html">page1</a></div>
        <div><a href="./page2.html">page2</a></div>
      </div>
    )
  }
}

ReactDOM.render(<Page0 />, document.getElementById('app'))
