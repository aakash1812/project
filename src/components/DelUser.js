
import React, { Component } from 'react';
import Modal from './Modal';
import axios from 'axios';

export default class DelUser extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });

    }

   
  

    render() {
        return (
            <div className="App">
                <button onClick={this.toggleModal}>
                    Delete
        </button>

                <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                    <div className="span8">
                        <h3>Are You sure?</h3>
                        <button onClick={this.props.onDelete}>
                            Delete
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}