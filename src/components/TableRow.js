import React, { Component } from 'react';
import ViewUser from './ViewUser';
import DelUser from './DelUser';


class TableRow extends Component {

  render() {
    return (
      <tr>
        <td>
          {this.props.obj._id}
        </td>
        <td>
          {this.props.obj.first_name + ' ' + this.props.obj.last_name}
        </td>
        <td>
          {this.props.obj.email}
        </td>
        <td>
          {this.props.obj.gender}
        </td>
        <td>
          <ViewUser userId={this.props.obj._id} />
        </td>
        <td>
          <button onClick={()=>this.props.editUser(this.props.obj._id)}>
            Edit
           </button>
        </td>
        <td>
          <DelUser onDelete={() => this.props.delUser(this.props.obj._id, this.props.index)} />
        </td>
      </tr>
    );
  }
}

export default TableRow;