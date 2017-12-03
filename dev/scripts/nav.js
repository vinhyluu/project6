import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import AdminView from './AdminView'; 
import SearchForm from './SearchForm'; 
import PublicPage from './PublicPage'; 
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <header>
                        <nav>
                            <NavLink to="/adminview" activeClassName="active">
                                <i className="fa fa-user-o" aria-hidden="true"></i>
                            </NavLink>
                            <NavLink to="/searchform" activeClassName="active">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </NavLink>
                            <NavLink to="/publicpage" activeClassName="active">
                                <i className="fa fa-share-alt" aria-hidden="true"></i>
                            </NavLink>
                        </nav>
                    </header>
                    <Switch>
                        <Route exactly component={AdminView} pattern="/adminview" />
                        <Route exactly component={PublicPage} pattern="/publicpage" />
                        <Route exactly component={SearchForm} pattern="/searchform" />
                    </Switch>
                </div>
            </Router>
=======

class Nav extends React.Component {
    render(){
        return(
            <div>
                <header>
                    <nav>
                        <a href=""><i className="fa fa-user-o" aria-hidden="true"></i></a>
                        <a href=""><i className="fa fa-search" aria-hidden="true"></i></a>
                        <a href=""><i className="fa fa-share-alt" aria-hidden="true"></i></a>
                    </nav>
                </header>
            </div>            
>>>>>>> 125f7583f90cca5a403f7e46c403565cc5683ba7
        )
    }
}
export default Nav;