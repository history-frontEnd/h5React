import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Page2 extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Page2</h1>
        </header>
        <div><a href="./page0.html">page0</a></div>
        <div><a href="./page1.html">page1</a></div>
        <div><a href="./page2.html">page2</a></div>
      </div>
    )
  }
}

ReactDOM.render(<Page2 />, document.getElementById('app'))
