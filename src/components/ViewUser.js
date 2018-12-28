
import React, { Component } from 'react';
import Modal from './Modal';
import axios from 'axios';
export default class ViewUser extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    let token = localStorage.getItem('token');
        let type = localStorage.getItem('type');
        let authToken = type + ' ' + token;
    
        let id=this.props.userId;
        axios.get(
            'http://192.168.6.234:3000/users/'+id,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": authToken
                }
            }
        ).then(
            res => {
              console.log(res.data.data);
                this.setState({
                    name: res.data.data.user.first_name + " " + res.data.data.user.last_name,
                    gender: res.data.data.user.gender,
                    email: res.data.data.user.email

                });
            }

        );
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.toggleModal}>
          View
        </button>

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
        <div className="span8">
          <h3>{this.state.name}</h3>
          <h6>Email: {this.state.email}</h6>
          <h6>Gender: {this.state.gender}</h6>
        </div>
            </Modal>
      </div>
    );
  }
}