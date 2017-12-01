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
          
        }
        this.removeItem = this.removeItem.bind(this);
        this.toggleClass = this.toggleClass.bind(this)
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
                currentItems: userItems,
                
            })
        })
    }

    toggleClass(e){
        e.preventDefault();
        const currentState = this.state.active;
        this.setState({ active: !currentState});
            
    }

        //store null or active value for each item added to shareable list on adminpage before we decide to add to shareable list

    render(){
        return(
            <div>
                <div>
                    <div>
                    <img src={`${this.state.imageUrl}`} alt=""/>
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
                    <div> 
                        <div key={item.selectionKey}>
                            <div className="wrapper">
                                <img src={item.imageUrl} alt=""/> 
                                <h1>{item.brandTitle}</h1>
                                <p>{item.productDescription}</p>
                                <a href="" onClick={(e) => this.removeItem(e, item.selectionKey)}>test</a>
                            </div>
                        </div>
                        <button className={this.state.active ? 'active': null} onClick={this.toggleClass}><i className="fa fa-plus" aria-hidden="true"></i>Add to Shareable Page</button>
                    </div>
                    )
                })}
                {/* <button className="addtoSharable" >Add to Sharable Page</button> */}
            </div>
        )
    }
}

export default AdminView