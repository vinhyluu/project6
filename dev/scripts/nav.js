import React from 'react';
import ReactDOM from 'react-dom';
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
                    <Route path="/adminview" component={AdminView} />
                    <Route path="/searchform" component={SearchForm} />
                    <Route path="/publicpage" component={PublicPage} />
                </div>
            </Router>
        )
    }
}
export default Nav;