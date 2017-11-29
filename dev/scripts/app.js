import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Landing from './landing';

class App extends React.Component {
    render() {
      return (
        <div>
          <Landing />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
