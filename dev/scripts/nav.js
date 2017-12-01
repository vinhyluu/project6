import React from 'react';
import ReactDOM from 'react-dom';

class Nav extends React.Component {
    render(){
        return(
            <div>
                <header>
                    <nav>
                        <a href=""><i class="fa fa-user-o" aria-hidden="true"></i></a>
                        <a href=""><i class="fa fa-search" aria-hidden="true"></i></a>
                        <a href=""><i class="fa fa-share-alt" aria-hidden="true"></i></a>
                    </nav>
                </header>
            </div>            
        )
    }
}
export default Nav;