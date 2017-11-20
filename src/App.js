import React, { Component, button, input } from 'react';
import './App.css';
import Auth from './UserAuth/Auth'
import Register from './UserAuth/Register'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      email: null,
      password: null,
      isRegistering: false,
      isLoggedin: false,
      username: null,
      IdNo: null,
      phone: null,
      address: null,
      food: [],
      name: null
    };
  }
 

  _login = () => {
    const {email, password} = this.state;

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
    .then((user) => (user.json()))
    .then((user) => {
      if(user.err){
        alert(user.err)
      }else{
        window.localStorage.setItem("user", JSON.stringify(user))
        console.log(JSON.stringify(user.id))
        this.setState({ user: user,
          username: user.username,
          IdNo: user.id,
          name: user.name,
          isLoggedin: true,
          isRegistering: false })
      }
    })
    .catch((err)=> {
      console.error(err)
    })
  }

  _register = () => {
    // Destructure our state
    const {address, phone, email, username, password, name} = this.state
    // Validate all inputs
    if (address === null || address.length > 255 ) {
      window.alert("Address should be at max 255 characters")
      return false;
    } else if (phone === null || phone.length != 12) {
      window.alert(" Phone number should be in format ###-###-####")
      return false
    } else if (email === null || email.length > 100) {
      window.alert("Email should be max 100 characters.")
      return false
    } else if (username  === null || (username < 8 || username > 12 )) {
      window.alert("Username should be between 8 and 12 characters long")
      return false
    } else if (password  === null || (password < 8 || password > 12)) {
      window.alert("Password should be between 8 and 12 characters long")
      return false
    }

    // Call the server
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
        name: name,
        email: email,
        password: password, 
        address: address, 
        username: username, 
        phone: phone})
    }).then((res) => (
      res.json()
    )).then((res) => {
      console.log(res)
      this.setState({IdNo: res[0], isLoggedin: true, isRegistering: false})
    }).catch((err) => window.alert(err))
    // On success, set the user
    // this.setState({isLoggedin: true, isRegistering: false})
  }

  handleEmail = (e) => {
    this.setState({email: e.target.value})
  }

  handlePassword = (e) => {
    this.setState({password: e.target.value})
  }
  
  setRegisterState = () => {
    this.setState({isRegistering: true})
  }

  userLoggedIn = () => {
    this.setState({isRegistering: false, isLoggedin: true})
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Munchies</h1>
          <div>
              {!this.state.isLoggedin ? (
              <Auth 
              login={this._login} 
              emailChange={this.handleEmail}
              passwordChange={this.handlePassword}
              setRegisterState={this.setRegisterState}
              setLoggedIn={this.setRegisterState}
              isLoggedin={this.state.isLoggedin}
              isRegistering={this.state.isRegistering}
              />) : (<div>Welcome, {this.state.name}!</div>)}
          </div>
        </header>
        {/* The user hits the register button */}
        {
          !this.state.isLoggedIn && this.state.isRegistering && (
            <div>
              <div>To get started, fill out the details below</div>
                {/* username */}
                <input onChange={(e) => {this.setState({username: e.target.value})}}
                placeholder="username" />
                {/* email */}
                <input onChange={this.handleEmail}
                type="email"
                placeholder="email" />
                {/* password */}
                <input onChange={this.handlePassword}
                  placeholder={"enter your password"}
                  type="password" />
                {/* name */}
                <input onChange={(e) => {this.setState({name: e.target.value})}}
                  placeholder="name" />
                {/* address */}
                <input onChange={(e) => {this.setState({address: e.target.value})}}
                placeholder="address" />
                {/* phone number */}
                <input onChange={(e) => {this.setState({phone: e.target.value})}}
                type="phone"
                placeholder="phone number" />

            <button onClick={this._register} className="No-focus"> Register </button>
          </div>
          )
        }
        {/* default displaying all products */}
        {
          !this.state.isLoggedIn && !this.state.isRegistering && (
            <div>Products here</div>
          )
        }
      </div>
    );
  }
}

export default App;
