import React from 'react';
import firestore from "./Firestore";
import './ShowList.css'


class ShowList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            users: [],
        }
    };

    getData = e => {
        var db = firestore.firestore();
        var userRef = db.collection("users")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    data.id=doc.id;
                    return {id:data.id,name:data.name,email:data.email};
                });
                this.setState({ data: data });
            });
    }

    deleteData = (e) =>{
        var db = firestore.firestore();
        var delRef = db.collection("users")
        .doc(e).delete();
        this.getData();
    };

    render() {
        this.getData();

        this.users = this.state.data.map((item, key) =>
            <li className="userList" key={item.id}>{item.name}, {item.email} <span className="delete" onClick={()=>this.deleteData(item.id)}>X</span></li>
        );
        return (
            <div>
            <h2>Current Users</h2>
            <ul>{this.users}</ul>
            </div>
        );
    }
}

export default ShowList;