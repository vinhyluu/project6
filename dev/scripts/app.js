import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Landing from './landing';
import SearchForm from './SearchForm';
// import ProfileView from './ProfileView';
import Nav from './nav';
import AdminView from './AdminView';
import PublicPage from './PublicPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class App extends React.Component {

    render() {
      return (
        <div>
          {/* <Nav/> */}
          <Landing />
<<<<<<< HEAD
          <h1>Makeup App</h1>
          <SearchForm />
          {/* <ProfileView /> */}
          {/* <Nav /> */}
          <AdminView />
          <PublicPage/>
=======
          {/* <h1>Makeup App</h1> */}
          {/* <SearchForm /> */}
          {/* <AdminView /> */}
          {/* <PublicPage/> */}
>>>>>>> 54a14e6ae50ce1ac7e9cfc61a1bd638d61a483a0
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
