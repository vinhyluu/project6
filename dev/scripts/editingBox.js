import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const provider = new firebase.auth.GoogleAuthProvider();

export default class EditingBox extends React.Component {
    constructor() {
        super();
        this.state = {
            editing: false,
            note: "",
            instagram: "",
            twitter: "",
            imageUrl: ""
        };
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    save(e) {
        e.preventDefault();
        const dbRefnote = firebase.database().ref(this.props.note);
        const dbRefInstagram = firebase.database().ref(this.props.instagram);
        const dbRefTwitter = firebase.database().ref(this.props.twitter);
        // const dbRefImageUrl= firebase.storage().ref(this.props.imageUrl);

        dbRefnote.update({
            note: this.note.value
        })
        dbRefInstagram.update({
            instagram: this.instagram.value
        })
        dbRefTwitter.update({
            twitter: this.twitter.value
        })
        // dbRefImageUrl.update({
        //     imageUrl: this.imageUrl.value
        // })
        // dbRefImageUrl.put(file).then(function (result){
        //     debRefImageUrl.getDownloadURL()
        //         .then(function (result) {
        //             dbRefImageUrl.updateMetadata({
        //                 imageUrl: this.state.imageUrl
        //             })
        //         }
        // )})

        var dbRef = firebase.database().ref()

        if (document.getElementById("userImage").value != "") {
            const file = document.getElementById("userImage").files[0];

            const storageRef = firebase.storage().ref(file.name);

            storageRef.put(file).then(function (result) {

                storageRef.getDownloadURL()
                    .then(function (result) {
                        this.setState({
                            imageUrl: result,
                        });
                        dbRef.update({
                            imageUrl: this.state.imageUrl,
                        })
                    }.bind(this));
            }.bind(this));
        }


        this.setState({
            editing: false,

            // note: "",
            // instagram: "",
            // twitter: "",
            // imageUrl: ""


        })
    }
    render() {
        let editingTemp = (
            <div>
                <p>{this.props.note}</p>
            </div>
        )
        if (this.state.editing) {
            editingTemp = (
                <form onSubmit={this.save}>
                    <div>
                        <input type="text" defaultValue={this.state.note} onChange={this.handleChange} name="note" ref={ref => this.note = ref} />
                        <input type="text" defaultValue={this.state.instagram} onChange={this.handleChange} name="instagram" ref={ref => this.instagram = ref} />
                        <input type="text" defaultValue={this.state.twitter} onChange={this.handleChange} name="twitter" ref={ref => this.twitter = ref} />
                        <input type="file" name="userImage[]" defaultValue={this.state.imageUrl} onChange={this.handleChange} ref={ref => this.imageUrl = ref} />
                    </div>
                    <input type="submit" value="Done editing" />
                </form>
            )
        }
        return (
            <div className="editingBox">
                <i className="fa fa-edit" onClick={() => this.setState({ editing: true })}></i>
                {editingTemp}

            </div>
        )
    }

}