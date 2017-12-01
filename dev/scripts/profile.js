import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const provider = new firebase.auth.GoogleAuthProvider();
class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            // loggedIn: false,
            // userKey: "",
            twitter: "",
            instagram: "",
            blurb: "",
            imageUrl: "",
        }
        // this.login = this.login.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        var dbRef = firebase.database().ref();

        dbRef.on('value', (snapshot) => {
            // console.log(data.val());
            const newState=[];
            const data = snapshot.val();

            // console.log(data);

            for (let key in data) {
                let newTwitter = data[`twitter`];
                let newBlurb = data[`blurb`];
                let newInstagram = data[`instagram`];
                let newImageUrl = data[`imageUrl`]

                // console.log(newTwitter)
                // console.log(key)
                // console.log(data[key])
                // newState.push(data[key])
                this.setState({
                    twitter: newTwitter,
                    instagram: newInstagram,
                    blurb: newBlurb,
                    imageUrl: newImageUrl
                })
                console.log(this.state)
            }
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

                    {/* <i className="fa fa-edit"></i> */}
                </form>
                <div>
                    <img src={`${this.state.imageUrl}`} alt=""/>
                    <p>{this.state.blurb}</p>
                
                    <a href={`${this.state.twitter}`}>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href={`${this.state.instagram}`}>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                
                </div>
            </div>
        )
    }
}

export default Profile;