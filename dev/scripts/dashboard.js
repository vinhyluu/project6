import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            userKey: "",
            userName: "",
        }
    }

    componentDidMount() {
        this.setState({
            userKey: this.props.userKey,
            userName: this.props.userName,

        });

        // // console.log(this.state.userKey);
        // const userRef = firebase.database().ref().push(`${this.state.userKey}`);
        // // .set(`${this.state.userKey}`);

        // console.log(this.state.userKey);

        // let song = {
        //     date: this.state.currentDate,
        //     lyrics: this.state.currentLyrics
        // }
        // firebase.database().ref(`${this.state.currentGenre}/${this.state.currentTitle}`).set(song);
    }
    render() {
        return (
            <section className="adminPage">
                <h1>Hayyy {this.state.userName}</h1>
            </section>
        )
    }
}

export default Dashboard;