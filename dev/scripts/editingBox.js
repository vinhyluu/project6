import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const provider = new firebase.auth.GoogleAuthProvider();

export default class EditingBox extends React.Component{
    constructor(){
        super();
        this.state ={
            editing: false,
            note: "",
        };
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    save(e){
        e.preventDefault();
        const dbRef= firebase.database().ref(this.props.note);

        dbRef.update({
          note: this.note.value
        })
        this.setState({
            editing: false,
            note: "",
        })
    }
    render(){
<<<<<<< HEAD
        // console.log(this.props.note)
=======
>>>>>>> 6eff353f3fea5192ab873b9b6d12cd5cccd98646
        let editingTemp = (
        
            <div>
               <p>{this.props.note}</p>  
            </div>
           
        )
        if (this.state.editing){
            editingTemp = (
                <form onSubmit={this.save}>
                    <div>
                        <input type="text" defaultValue={this.state.note} onChange={this.handleChange} name="note" ref={ref => this.note = ref}/>
                    </div>
                    <input type="submit" value="Done editing"/>
                </form>
            )
        }
        return(
            <div className="editingBox">
                 <i className="fa fa-edit" onClick={()=>this.setState({editing:true})}></i>
                 {editingTemp}
    
            </div>
        )
    }

}

