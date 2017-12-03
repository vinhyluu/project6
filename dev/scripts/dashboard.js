import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userKey: "",
            userName: "",
            existingUser: "",
        }
        this.editInfo = this.editInfo.bind(this);
    }

    componentDidMount() {
        const userId = this.props.userKey;
        
        const dbRef = firebase.database().ref(`${userId}`);
        
        dbRef.on("value", (res) => {
            const data = res.val();
            
            const userStanding = data.existingUser;
            console.log(userStanding);
            if(data.existingUser === true){
                this.setState({
                    existingUser: true
                })
                console.log(userStanding);
            }else{
                this.setState({
                    existingUser: false
                })
                console.log(userStanding);
            }   
        })
    }

    editInfo(e){
        e.preventDefault();
        this.setState({
            existingUser: true
        })

        const dbRef = firebase.database().ref(`${this.props.userKey}`);

        dbRef.update({
            existingUser: true
        })
    }

    render() {
        return (
            <div>
                {this.state.existingUser === false
                    ? <section>
                        <h1>Not existing user</h1>
                        <button onClick={this.editInfo}>BUTTON</button>
                    </section>
                    : <h1>existing user</h1>}
                <a href="" onClick={this.logout}>Logout</a>
            </div>
        )
    }
}

export default Dashboard;