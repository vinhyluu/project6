import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';

class PublicPage extends React.Component{
    constructor() {
        super();
        this.state = {
            publicItems: [],
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref("N5eadjZta9gfwlPBYiKIx2Q1G7v1").child("selections");

        const deactiveItem = [];
        dbRef.on("value", (res) => {
            const data = res.val();
            for (let key in data) {
                const value = data[key];
                deactiveItem.push(value);
            }

            const activeItems = [];
            for (var i = 0; i < deactiveItem.length; i++) {
                if (deactiveItem[i].active === true) {
                    activeItems.push(deactiveItem[i]);
                }
            }

            this.setState({
                publicItems: activeItems,
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