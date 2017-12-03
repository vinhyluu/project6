import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';

class PublicPage extends React.Component{
    constructor(){
        super();
        this.state = {
            userBackground: "",
        }
    }

    componentDidMount(){
        const dbRef = firebase.database().ref("N5eadjZta9gfwlPBYiKIx2Q1G7v1");
        dbRef.on("value", (res) => {
            const data = res.val();
            this.setState({
                userBackground: data.backgroundColor
            })
        })
    }

render(){
    return(
        <div>
         hi
        </div>
        )
    }
}



// adminjs -- in there we're going to make a button that you can toggle onClick
//we're going to a ternary that says for the previous button onClick if true then display in public page





export default PublicPage