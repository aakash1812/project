// Create.js

import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.onChangeHostemail = this.onChangeHostemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (token) {
            this.props.history.push({
                pathname: '/dashboard'
            })
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
    onSubmit(e) {
        e.preventDefault();
        const serverport = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://192.168.6.234:3000/login', serverport)
            .then(
                res => {
                    
                    console.log('login response====>>>>'+JSON.stringify(res.data));
                    
                    
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

    render() {
        return (
            <div style={{ marginTop: 50 }}>
                <div className="container ">
                    <div className="row border-area">
                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <h2><strong>Login to Your Account </strong></h2>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Email:  </label>
                                    <input type="text" className="form-control" onChange={evt => this.setState({ ...this.state, email: evt.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input type="text" className="form-control" onChange={this.onChangepassword} />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Login" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}