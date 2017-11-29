import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const config = {
    apiKey: "AIzaSyAwexiXibtCy-1vAH6V_LF2mkrrLlgDQQo",
    authDomain: "makeup-fun.firebaseapp.com",
    databaseURL: "https://makeup-fun.firebaseio.com",
    projectId: "makeup-fun",
    storageBucket: "makeup-fun.appspot.com",
    messagingSenderId: "1012365554610"
};
firebase.initializeApp(config);


const provider = new firebase.auth.GoogleAuthProvider();
class PetList extends React.Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false,
            userKey: "",
            twitter: "",
            instagram: "",
            blurb: "",
            imageUrl: "",
        }
        this.login = this.login.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user.email);
            if (user) {
                // console.log("existing user");
                this.setState({
                    loggedIn: true,
                    userKey: user.email,
                });
            } else {
                // console.log("you're not a user");
                this.setState({
                    loggedIn: false,
                    userKey: "",
                });
            }
        });
    }
    login(e) {
        e.preventDefault();
        console.log('sign in');
        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                console.log(user);
                this.setState({
                    loggedIn: true,
                    userKey: user.email,
                })
            })
    }
    logout(e) {
        e.preventDefault();
        console.log('logout');
        firebase.auth().signOut()
            .then((user) => {
                console.log(user);
            });
    }
    handleClick(e) {
        console.log('clicked');
        e.preventDefault();

        // console.log(this.twitter.value)

        const newTwitter = this.twitter.value;
        const newInstagram = this.instagram.value;
        const newBlurb = this.description.value
        const dbRef = firebase.database().ref();



        this.setState({
            twitter: newTwitter,
            instagram: newInstagram,
            blurb: newBlurb
        });

        if (document.getElementById("userImage").value != "") {
            console.log("you have a file");
            const file = document.getElementById("userImage").files[0];

            const storageRef = firebase.storage().ref(file.name);

            storageRef.put(file).then(function (result) {

                storageRef.getDownloadURL()
                    .then(function (result) {
                        console.log(result);
                        this.setState({
                            imageUrl: result,
                        });
                        dbRef.update({
                            // twitter: newTwitter,
                            // instagram: newInstagram,
                            // blurb: newBlurb,
                            imageUrl: this.state.imageUrl,
                        })
                    }.bind(this));
            }.bind(this));
        } else {
            dbRef.update({
                twitter: newTwitter,
                instagram: newInstagram,
                blurb: newBlurb
            })
        }

    // const file = document.getElementById("userImage").files[0];

    // const storageRef = firebase.storage().ref(file.name);

    // storageRef.put(file).then(function (result) {

    //   storageRef.getDownloadURL()
    //     .then(function (result) {
    //       console.log(result);
    //       this.setState({
    //         imageUrl: result,
    //       });
    //       dbRef.update({
    //         twitter: newTwitter,
    //         instagram: newInstagram,
    //         blurb: newBlurb,
    //         imageUrl: this.state.imageUrl,
    //       })
    //     }.bind(this));
    // }.bind(this));

    // dbRef.set({
    //   twitter: newTwitter,
    //   instagram: newInstagram,
    //   blurb: newBlurb,
    //   imageUrl: this.state.imageUrl,
    // })

    // const dbReftwitter = firebase.database().ref();
    // dbReftwitter.push(newTwitter);
    // const dbRefinstagram = firebase.database().ref();
    // dbRefinstagram.push(newInstagram);
    // const dbRefblurb = firebase.database().ref();
    // dbRefblurb.push(newBlurb)
    }
    render(){
        // console.log(this.props)
        return(
            <div>
                <form onSubmit={this.handleClick}>
                    <div className="twitterLink">
                        <label htmlFor="twitter">Twitter Link</label>
                        <input type="text" name="twitter" ref={ref => this.twitter = ref} />
                    </div>
                    <div className="instagramLink">
                        <label htmlFor="instagram">Instagram Link</label>
                        <input type="text" name="instagram" ref={ref => this.instagram = ref} />
                    </div>
                    <div className="description">
                        <label htmlFor="profileDescription"></label>
                        <textarea name="profileDescription" id="" maxLength="280" ref={ref => this.description = ref}></textarea>
                    </div>
                    <div className="image">
                        <input type="file" name="userImage[]" id="userImage" />
                    </div>
                    <input className="submit" type="submit" value="Add" />
                </form>
            </div>
        )
    }
}