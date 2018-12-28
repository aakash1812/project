// App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Create from './components/Create';
import Index from './components/Index';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import Dashboard from './components/Dashboard';
import EditUser from './components/EditUser';
import './App.css';
import axios from 'axios';



import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // constructor(props) {
  //   super(props);


  // }
  logout(e) {
    let token = localStorage.getItem('token');
    let type = localStorage.getItem('type');
    let authToken = type + ' ' + token;
    if (!token) {
      this.props.history.push({
        pathname: '/login'
      })
    }
    axios.post('http://192.168.6.234:3000/logout',
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": authToken
        }
      })
      .then(
        localStorage.removeItem('token'),
        localStorage.removeItem('type'),
        this.props.history.push({
          pathname: '/login'
        })
      )
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    let token = localStorage.getItem('token');
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">React Express App</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link to={'/create'} className="nav-link">Create</Link></li>
                {token ? (<li className="nav-item"><Link to={'/index'} className="nav-link">List</Link></li>) : " "}
                {token ? " " : (<li className="nav-item"><Link to={'/login'} className="nav-link">Login</Link></li>)}
                {token ? " " : (<li className="nav-item"><Link to={'/register'} className="nav-link">Register</Link></li>)}
                {token ? (<li className="nav-item"><Link to="#" className="nav-link" onClick={this.logout}>Logout</Link></li>) : " "}
              </ul>
              <hr />
            </div>
          </nav> <br />
          <Switch>
            <Route exact path='/create' component={Create} />
            <Route path='/index' component={Index} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={RegisterUser} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/editUser' component={EditUser} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;