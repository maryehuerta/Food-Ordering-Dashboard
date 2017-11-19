import React, { Component, button, input } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      food: [],
      
    };
  }

  login = () => {
    const {email, password} = this.state;
    const body = JSON.stringify()

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
    .then((user) => (user.json()))
    .then((user) => window.localStorage.setItem("user", JSON.stringify(user)))
    .catch((err)=> {
      console.error(err)
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Munchies</h1>
          <div className="Login-form">
            <input onChange={(e) => {this.setState({email: e.target.value})}}className="No-focus" type="email" placeholder="email" />
            <input onChange={(e) => {this.setState({password: e.target.value})}}className="No-focus" type="password" />
            <button onClick={this.login} className="No-focus"> Login </button>
          </div>

        </header>
        <div className="Food-list"> {this.state.food} </div>
      </div>
    );
  }
}

export default App;
