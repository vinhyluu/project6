import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from './form';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Dashboard from './dashboard';


const provider = new firebase.auth.GoogleAuthProvider();

class Landing extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            userKey: "",
            userName: "",
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    loggedIn: true,
                    userKey: user.uid,
                    userName: user.displayName,
                });
            } else {
                this.setState({
                    loggedIn: false,
                    userKey: "",
                    userName: "",
                });
            }
        });
    }

    componentDidMount() {
    }

    login(e) {
        e.preventDefault();
        firebase.auth().signInWithPopup(provider)
            .then((data) => {
                this.setState({
                    loggedIn: true,
                    userKey: data.user.uid,
                    userName: data.user.displayName,
                });

                const userId = firebase.auth().currentUser.uid;

                const dbRef = firebase.database().ref(`${userId}/`);

                dbRef.update({
                    name: `${data.user.displayName}`,
                    email: `${data.user.email}`,
                });
            });
    }

    logout(e) {
        e.preventDefault();
        firebase.auth().signOut()
            .then((user) => {
            });
        this.setState({
            loggedIn: false,
            userKey: "",
            userName: "",
        })
    }
    render() {
        return (
            // when the user signs and and if they have an existing account, direct them to the admin page
            //if the user doesn't haev an existing account, direct them to the first time users page 
            <div>
                {this.state.loggedIn === false
                    ? <section>
                        <div>

                        </div>
                        <div className="wrapper">
                            <a href="" onClick={this.login}>Sign in with Google</a>
                        </div>
                    </section>
                    : <Dashboard
                        userKey={this.state.userKey}
                        userName={this.state.userName} />}
                <a href="" onClick={this.logout}>Logout</a>
                <Form/>
            </div>
        )
    }
}

export default Landing;
