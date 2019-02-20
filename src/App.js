import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    value: 0
  }

  render() {
    return (
      <div>
        <h1 id="number">{this.state.value}</h1>
        <button onClick={() => {this.setState({value: this.state.value+1})}}>+</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => {this.setState({value: this.state.value-1})}}>-</button>
      </div>
    );
  }
}

export default App;
