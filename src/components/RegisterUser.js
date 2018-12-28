// Create.js

import React, { Component } from 'react';
import axios from 'axios';
import { withAlert } from 'react-alert'


export default class RegisterUser extends Component {

    constructor(props) {
        super(props);
        this.onChangeHostemail = this.onChangeHostemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeHostGender = this.onChangeHostGender.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            last_name: '',
            first_name: '',
            gender: '',
        }
    }
    onChangeHostemail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeHostGender(e) {
        this.setState({
            gender: e.target.value
        });
    }
    onChangeFname(e) {
        this.setState({
            first_name: e.target.value
        });
    }
    onChangeLname(e) {
        this.setState({
            last_name: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const serverport = {
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
            first_name: this.state.first_name,
            last_name: this.state.last_name

        }
        axios.post('http://192.168.6.234:3000/signup', serverport)
            .then(
                res => {
                    console.log(res.data);
                    localStorage.setItem('token', res.data.data.token)
                    localStorage.setItem('type', res.data.data.type)

                    this.props.history.push({
                        pathname: '/dashboard',
                        // search: '?the=search',
                        state: {
                            message: res.data.message,
                            token: res.data.data.token
                        }
                    })
                }
            );

        this.setState({
            email: '',
            password: ''
        });
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        if (token) {
            this.props.history.push({
                pathname: '/dashboard'
            })
        }

    }
    render() {
        return (
            <div style={{ marginTop: 50 }}>
                <div className="container ">
                    <div className="row border-area">
                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <h3>Add New User</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>First Name:  </label>
                                    <input type="text" className="form-control" onChange={evt => this.setState({ ...this.state, first_name: evt.target.value })} placeholder="Please enter first name" value={this.state.fname} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:  </label>
                                    <input type="text" className="form-control" onChange={this.onChangeLname} placeholder="Please enter last name" value={this.state.lname} />
                                </div>
                                <div className="form-group">
                                    <label>Gender: </label>
                                    <select onChange={this.onChangeHostGender} className="form-control" value={this.state.gender}>
                                        <option value="">---Please select the gender---</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Email:  </label>
                                    <input type="text" className="form-control" onChange={this.onChangeHostemail} placeholder="Please enter Email" value={this.state.email} />
                                </div>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input type="password" className="form-control" onChange={this.onChangepassword} placeholder="Please enter password" value={this.state.pass} />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Register" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}