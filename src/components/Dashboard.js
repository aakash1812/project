

// Create.js

import React, { Component } from 'react';
import axios from 'axios';
import mainLogo from '../images/one.jpeg';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        // this.onChangeHostemail = this.onChangeHostemail.bind(this);
        // this.onChangepassword = this.onChangepassword.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        this.recievedMessage = "";
        this.state = {
            recievedMessage: '',
            name: '',
            gender: '',
            email: ''

        }
    }
    componentDidMount() {
         let token = localStorage.getItem('token');
        //let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJtYWxlIiwiX2lkIjoiNWMxY2EwZjY2ZTQzZjkxYzA3MzcwOWZlIiwiZmlyc3RfbmFtZSI6ImFuY2hhbCIsImxhc3RfbmFtZSI6InVzZXIiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwicGFzc3dvcmQiOiJzaGExJGFjODRlZWIzJDEkYTIzZGEwNWFkOTA2M2I0MmRhMjdkNGQ1NTkzZGMwOWNiYjdmNGFjYiIsImNyZWF0ZWRBdCI6IjIwMTgtMTItMjFUMDg6MTQ6NDYuODc2WiIsInVwZGF0ZWRBdCI6IjIwMTgtMTItMjFUMDg6MTQ6NDYuODc2WiIsImNvdW50ZXIiOjEsIl9fdiI6MCwiaWF0IjoxNTQ1NDAyNjkwLCJleHAiOjE1NDU0ODcyOTB9.spFZNjWYxNaR-zI9M-ckgnXUa68MAhHAfbFCgsmqQRI";

        let type = localStorage.getItem('type');
        let authToken = type + ' ' + token;
        if (!token) {
            this.props.history.push({
                pathname: '/login'
            })
        }
        axios.get(
            'http://192.168.6.234:3000/user',
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": authToken
                }
            }
        ).then(


            res => {
                this.setState({
                    name: res.data.data.user.first_name + " " + res.data.data.user.last_name,
                    gender: res.data.data.user.gender,
                    email: res.data.data.user.email

                });
            }

        );

        this.setState({
            email: '',
            password: ''
        });
    }

    // }

    render() {
        // console.log(this.state)
        return (
            <div style={{ marginTop: 50 }} className="profile">
                <h3>Welcome {this.state.name}</h3>

                <div className="container-fluid well span6">
                    <div className="row-fluid">
                        <div className="span2" >
                            <img src={mainLogo} className="img-circle" />
                        </div>

                        <div className="span8">
                            <h3>{this.state.name}</h3>
                            <h6>Email: {this.state.email}</h6>
                            <h6>Gender: {this.state.gender}</h6>
                            {/* <h6>Old: 1 Year</h6>
                            <h6><a href="#">More... </a></h6> */}
                        </div>

                        {/* <div className="span2">
                            <div className="btn-group">
                                <a className="btn dropdown-toggle btn-info" data-toggle="dropdown" href="#">
                                    Action
                    <span className="icon-cog icon-white"></span><span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#"><span className="icon-wrench"></span> Modify</a></li>
                                    <li><a href="#"><span className="icon-trash"></span> Delete</a></li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>


            </div>

        )
    }
}