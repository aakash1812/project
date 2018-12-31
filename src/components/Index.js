// Index.js

import React, { Component } from 'react';
import axios from 'axios';
import DelUser from './DelUser';

import ReactTable from "react-table";
import "react-table/react-table.css";

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serverports: [],
      search: ''
    };

    this.onSearch = this.onSearch.bind(this);

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
    axios.get('http://192.168.6.234:3000/users',
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": authToken
        }
      })
      .then(response => {
        this.setState({ serverports: response.data.data.users });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  delUser = (id, index) => {
    let token = localStorage.getItem('token');
    let type = localStorage.getItem('type');
    let authToken = type + ' ' + token;
    const { serverports } = this.state;
    // let id = this.props.userId;
    axios.delete(
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
          serverports.splice(index, 1);
          this.setState({ ...this.state, serverports })
        }
      }
    );
  }

  editUser = (id) => {
    console.log();
    this.props.history.push({
      pathname: '/editUser',
      search: id
    })

  }
  onSearch(e) {
    this.setState({
      search: e.target.value
    });
    // e.preventDefault();
    let token = localStorage.getItem('token');
    let type = localStorage.getItem('type');
    let authToken = type + ' ' + token;

    const search = this.state.search;
    axios.get('http://192.168.6.234:3000/users?search=' + search,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": authToken
        }
      })
      .then(response => {
        this.setState({ serverports: response.data.data.users });
      })
      .catch(function (error) {
        console.log(error);
      })

    this.setState({
      email: '',
      password: ''
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form className="card card-sm">
              <div className="card-body row no-gutters align-items-center">
                <div className="col-auto">
                  <i className="fas fa-search h4 text-body"></i>
                </div>
                <div className="col">
                  <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords" onChange={this.onSearch} />
                </div>
                {/* <div className="col-auto">
                  <button className="btn btn-lg btn-success" type="submit">Search</button>
                </div> */}
              </div>
            </form>
          </div>
        </div>

        <ReactTable
            data={this.state.serverports}
            columns={[
                {
                    Header: "ID",
                    Cell: row => (row.original._id)
                },
                {
                    Header: "Name",
                    Cell: row => (`${row.original.first_name} ${row.original.last_name}`)
                },
                {
                    Header: "Email",
                    Cell: row => (row.original.email)
                },
                {
                    Header: "Gender",
                    Cell: row => (row.original.gender)
                },
                {
                    Header: "Action",
                    Cell: row => (
                        <div>
                            <button onClick={()=>this.editUser(row._id)}>
                                Edit
                            </button>
                            <DelUser onDelete={() => this.delUser(row._id, row._id)} />
                        </div>
                    )
                },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
        />


        {/* <table className="table table-striped">
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
            {
              this.state.serverports.map((object, i) => {
                return <TableRow obj={object} key={i} editUser={this.editUser} delUser={this.delUser} index={i} />
              })
            }
          </tbody>
        </table> */}

      </div>
    );
  }
}