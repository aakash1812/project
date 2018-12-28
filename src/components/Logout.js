// Index.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Logout extends Component {

  constructor(props) {
    super(props);
    this.state = { serverports: [] };
  }
  componentDidMount() {
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
    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Gender</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {/* {this.tabRow()} */}
          </tbody>
        </table>
      </div>
    );
  }
}