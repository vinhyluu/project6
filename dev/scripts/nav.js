import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Dashboard extends React.Component {
render(){
    return(
        <div>
            <header>
                <Link to="/"><i class="fa fa-user-o" aria-hidden="true"></i></Link>
                <Link to="/"><i class="fa fa-search" aria-hidden="true"></i></Link>
                <Link to="/"><i class="fa fa-share-alt" aria-hidden="true"></i></Link>
            </header>
        </div>
    )
}
}
export default Nav;