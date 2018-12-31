import React, { Component } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Index from './Index';


export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeHostemail = this.onChangeHostemail.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeHostGender = this.onChangeHostGender.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            last_name: '',
            first_name: '',
            gender: '',
        }
    }
    onChangeHostemail(e) {
        this.setState({
            eemail: e.target.value,
            new_email: e.target.value
        });
    }

    onChangeHostGender(e) {
        this.setState({
            ggender: e.target.value,
            new_gender: e.target.value
        });
    }
    onChangeFname(e) {
        this.setState({
            fname: e.target.value,
            new_fname: e.target.value
        });
    }
    onChangeLname(e) {
        this.setState({
            lname: e.target.value,
            new_lname: e.target.value
        });
    }


    back_to_list = (id) => {
        console.log();
        this.props.history.push({
          pathname: '/index'
       //   search: id
        })}

    componentDidMount() {
        let token = localStorage.getItem('token');
        let type = localStorage.getItem('type');
        let authToken = type + ' ' + token;

        var url = this.props.location;
        let id = this.props.location.search;
        id = id.split('?')[1];
        this.setState({
            user_id: id,
        });
        axios.get(
            'http://192.168.6.234:3000/users/' + id,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": authToken
                }
            }
        ).then(
            // if (token) {
            res => {
                if (res.data) {
                    this.setState({
                        fname: res.data.data.user.first_name,
                        lname: res.data.data.user.last_name,
                        ggender: res.data.data.user.gender,
                        eemail: res.data.data.user.email
                    });
                }
            }
        );
    }
    onSubmit(e) {
        e.preventDefault();
        const serverport = {
            email: this.state.new_email,
            gender: this.state.new_gender,
            first_name: this.state.new_fname,
            last_name: this.state.new_lname

        }
        let token = localStorage.getItem('token');
        let type = localStorage.getItem('type');
        let authToken = type + ' ' + token;

        let id = this.state.user_id;
        axios.put(
            'http://192.168.6.234:3000/users/' + id, serverport,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": authToken
                }
            }
        ).then(
            res => {
                this.props.history.push({
                    pathname: '/index'
                 //   search: id
                  })
            
        }
        )
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

    }


    render() {
        return (
            <div style={{ marginTop: 50 }}>
                <div className="container ">
                    <div className="row border-area">
                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <h3>Edit User</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>First Name:  </label>
                                    <input type="text" className="form-control" onChange={this.onChangeFname} placeholder="Please enter first name" value={this.state.fname} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:  </label>
                                    <input type="text" className="form-control" onChange={this.onChangeLname} placeholder="Please enter last name" value={this.state.lname} />
                                </div>
                                <div className="form-group">
                                    <label>Gender: </label>
                                    <select onChange={this.onChangeHostGender} className="form-control" value={this.state.ggender}>
                                        <option value="">---Please select the gender---</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Email:  </label>
                                    <input type="text" className="form-control" onChange={this.onChangeHostemail} placeholder="Please enter Email" value={this.state.eemail} />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Update" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


