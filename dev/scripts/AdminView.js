import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import EditingBox from './EditingBox';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class AdminView extends React.Component{
    constructor(){
        super();
        this.state={
            currentItems: [],
            active: false,
            testColor: "",
        }
        this.removeItem = this.removeItem.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.toggleColor = this.toggleColor.bind(this);
        this.addPublic = this.addPublic.bind(this);
        this.removePublic = this.removePublic.bind(this);
    }

    componentDidMount(){
        const dbRef = firebase.database().ref("N5eadjZta9gfwlPBYiKIx2Q1G7v1").child("selections");

        const userItems = [];
        dbRef.on("value", (res) => {
            const data = res.val();

            for (let key in data) {
                const value = data[key];
                userItems.push(value);
            }
            this.setState({
                currentItems: userItems
            })
        })
    }
    
    removeItem(e, key) {
        e.preventDefault();
        const selectionRef = key;
        const toRemove = firebase.database().ref("N5eadjZta9gfwlPBYiKIx2Q1G7v1").child(`selections/${key}`);
        
        toRemove.remove();

        const dbRef = firebase.database().ref("N5eadjZta9gfwlPBYiKIx2Q1G7v1").child("selections");

        const userItems = [];
        dbRef.on("value", (res) => {
            const data = res.val();

            for (let key in data) {
                const value = data[key];
                userItems.push(value);
            }
            this.setState({
                currentItems: userItems
            })
        })
    }

    addPublic(e, key) {
        e.preventDefault();
        const dbRef = firebase.database().ref("N5eadjZta9gfwlPBYiKIx2Q1G7v1").child(`selections/${key}`);

        dbRef.update({
            active: true,
        });
    }

    removePublic(e, key) {
        e.preventDefault();
        const dbRef = firebase.database().ref("N5eadjZta9gfwlPBYiKIx2Q1G7v1").child(`selections/${key}`);

        dbRef.update({
            active: false,
        });
    }

    toggleClass(){
        const currentState = this.state.active;
        this.setState({ active: !currentState})
    }

    toggleColor(e, colorValue){
        e.preventDefault();
        this.setState({
            testColor: colorValue
        })
        const dbRef = firebase.database().ref("N5eadjZta9gfwlPBYiKIx2Q1G7v1");
        dbRef.update({
            backgroundColor: colorValue
        })
    }
    
    
    render(){
        const divStyle = {
            background: "black",
            width: "50px",
            height: "50px",
        }


        return(
            <div>
                <div>
                    <div>
                        <div>
                            <img src={`${this.state.imageUrl}`} alt=""/>
                            <button className={this.state.active ? 'your_className': null} onClick={this.toggleClass}><i className="fa fa-plus" aria-hidden="true"></i></button>
                            </div>

                            <EditingBox/>
                            
                            <p>{this.state.note}</p>
                            <a href={`${this.state.twitter}`}>
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                            <a href={`${this.state.instagram}`}>
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                    </div>
                    
                    {this.state.currentItems.map((item)=>{
                        return(
                        <div key={item.selectionKey}>
                            <div className="wrapper">
                                <img src={item.imageUrl} alt=""/> 
                                <h1>{item.brandTitle}</h1>
                                <p>{item.productDescription}</p>
                                <a href="" onClick={(e) => this.removeItem(e, item.selectionKey)}>test</a>
                                                            <a href="" onClick={(e) => this.addPublic(e, item.selectionKey)}>Add Public</a>
                            <a href="" onClick={(e) => this.removePublic(e, item.selectionKey)}>Remove Public</a>
                            </div>
                        </div>
                        )
                    })}
                </div>
            <div>
                <div style={divStyle} onClick={(e) => this.toggleColor(e, "userOption1")}></div>
                <div style={divStyle} onClick={(e) => this.toggleColor(e, "userOption2")}></div>
                <div style={divStyle} onClick={(e) => this.toggleColor(e, "userOption3")}></div>
                <div style={divStyle} onClick={(e) => this.toggleColor(e, "userOption4")}></div>
            </div>
        </div>
        )
    }
}

export default AdminView