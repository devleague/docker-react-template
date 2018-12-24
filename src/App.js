import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // properties
    this.state = {
      smoke: '',
      users: [],
      newUser: { username: '' }
    };

    // bindings
    this.smokeTest = this.smokeTest.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.createUser = this.createUser.bind(this);

    // init
    this.smokeTest();
    this.getUsers();
  }

  smokeTest() {
    fetch('/api/smoke')
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        this.setState({ smoke: body.smoke });
      });
  }

  getUsers() {
    fetch('/api/users')
      .then((res) => { return res.json(); })
      .then((body) => {
        this.setState({ users: body });
      });
  }

  updateUser(e) {
    this.setState({ newUser: { username: e.target.value }});
  }

  createUser() {
    const newUser = this.state.newUser;
    const headers = { 'Content-Type': 'application/json' };
    fetch('/api/users', { method: 'POST', body: JSON.stringify(newUser), headers })
      .then((res) => {
        return fetch('/api/users')
          .then((res) => { return res.json(); })
          .then((body) => { this.setState({ users: body }); });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <div>
            { this.state.smoke ? this.state.smoke : '' }
          </div>

          <div>
            {
              this.state.users.map((user) => {
                return (
                  <div>
                    { user.username }
                  </div>
                );
              })
            }
          </div>

          <div>
            <label> Create new User: </label>
            <input type="text" value={this.state.newUser.username} onChange={this.updateUser}/>
            <button onClick={this.createUser}>Create User</button>
          </div>

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
