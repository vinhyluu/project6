import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Landing from './landing';
import SearchForm from './SearchForm';
// import ProfileView from './ProfileView';
import AdminView from './AdminView';
import PublicPage from './PublicPage';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';

class App extends React.Component {

    render() {
      return (
        <div>
          {/* <Nav/> */}
          <Landing />
          {/* <h1>Makeup App</h1> */}
          {/* <SearchForm /> */}
          {/* <AdminView /> */}
          {/* <PublicPage/> */}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
