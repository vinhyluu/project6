import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const provider = new firebase.auth.GoogleAuthProvider();

class Form extends React.Component {

    constructor() {
        super();
        this.state = {
            twitter: "",
            instagram: "",
            note: "",
            imageUrl: ""
        }
        this.handleClick = this.handleClick.bind(this);       
    }
    
    componentDidMount() {
        const dbRef = firebase.database().ref(`${this.props.userkey}`);

        dbRef.on('value', (snapshot) => {
            const newState=[];
            const data = snapshot.val();

            for (let key in data) {
                let newTwitter = data[`twitter`];
                let newNote = data[`note`];
                let newInstagram = data[`instagram`];
                let newImageUrl = data[`imageUrl`]

                this.setState({
                    twitter: newTwitter,
                    instagram: newInstagram,
                    imageUrl: newImageUrl,
                    note: newNote
                })
            }
        });
    }
    
    handleClick(e) {
        e.preventDefault();

        const newTwitter = this.twitter.value;
        const newInstagram = this.instagram.value;
        const newNote = this.note.value
        const dbRef = firebase.database().ref(`${this.props.userkey}`);

        const file = document.getElementById("userImage").files[0];

        const storageRef = firebase.storage().ref(file.name);

        storageRef.put(file).then(function (result) {
            storageRef.getDownloadURL()
                .then(function (result) {
                    dbRef.update({
                        imageUrl: result,
                        twitter: newTwitter,
                        instagram: newInstagram,
                        note: newNote,
                        existingUser: true,
                    })
                });
        });
    }
    render(){
        
        return(
            <div>
                <form onSubmit={this.handleClick}>
                    <div className="twitterLink">
                        <label htmlFor="twitter">Twitter Link</label>
                        <input type="text" name="twitter" id="twitter" ref={ref => this.twitter = ref} />
                    </div>
                    <div className="instagramLink">
                        <label htmlFor="instagram">Instagram Link</label>
                        <input type="text" name="instagram" id="instagram" ref={ref => this.instagram = ref} />
                    </div>
                    <div className="note">
                        <label htmlFor="note"></label>
                        <textarea name="note" id="note" maxLength="280" ref={ref => this.note = ref}></textarea>
                    </div>
                    <div className="userImage">
                        <input type="file" name="userImage[]" id="userImage" ref={ref => this.imageUrl = ref}/>
                    </div>
                    <input className="submit" type="submit" value="Add" />
                </form>  
            </div>
        )
    }
}

export default Form;