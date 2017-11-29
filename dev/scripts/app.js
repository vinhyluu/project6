import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
<<<<<<< HEAD
import firebase from 'firebase';
=======
import SearchForm from './SearchForm'
>>>>>>> dbb028cdee5bf8394b5214eccc5a4fea39f8791f
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Landing from './landing';


class App extends React.Component {

  render() {
    return (
      <div>
        <Heading/>
      </div>
    )
  }

    render() {
      return (
        <div>
<<<<<<< HEAD
          <Landing />
=======
          <h1>Makeup App</h1>
          <SearchForm />
>>>>>>> dbb028cdee5bf8394b5214eccc5a4fea39f8791f
        </div>
      )
    }

}






ReactDOM.render(<App />, document.getElementById('app'));