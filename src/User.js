import React from 'react';
import ShowList from './ShowList';

import firestore from "./Firestore";

class User extends React.Component{
    constructor(){
        super();
        this.state = {
            email:"",
            name:"",
            submitted:true,
        };
    };
    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    addUser = e =>{
        e.preventDefault();
        const db = firestore.firestore();

        const userRef = db.collection("users").add({
            name:this.state.name,
            email:this.state.email,
        });
        this.setState({
            name:"",
            email:"",
            submitted:!this.state.submitted,
        });
    };

    render() {
        return (
            <div>
            <form onSubmit={this.addUser}>
                <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={this.updateInput}
                value={this.state.name}
                />
                <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={this.updateInput}
                value={this.state.email}
                />
                <button type = "submit">submit</button>
            </form>
            <ShowList submitted={this.state.submitted}/></div>
        );
    }
}



export default User;