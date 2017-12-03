import React from 'react';
import ReactDOM from 'react-dom';

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
        )
    }
}
export default Nav;