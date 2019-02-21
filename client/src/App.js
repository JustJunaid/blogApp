import React, { Component } from 'react';
import './App.css';
class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };


render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}
export default App;

// import React, { Component } from 'react';
// import './App.css';

// class App extends Component {
//   state = {
//     value: 0
//   }

//   render() {
//     return (
//       <div>
//         <h1 id="number">{this.state.value}</h1>
//         <button onClick={() => {this.setState({value: this.state.value+1})}}>+</button>
//         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//         <button onClick={() => {this.setState({value: this.state.value-1})}}>-</button>
//       </div>
//     );
//   }
// }

// export default App;
