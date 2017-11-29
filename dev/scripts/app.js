import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <div>
        <Heading/>
      </div>
    )
  }
}






ReactDOM.render(<App />, document.getElementById('app'));