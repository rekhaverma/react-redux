import React from 'react';
// import { login, logout } from "../../redux/action/actions.js";
// import { browserHistory } from 'react-router';


class MainLayout extends React.Component {

  componentWillMount() {
    // let user = JSON.parse(localStorage.getItem('user'));
    // user ? browserHistory.push('/') : '';
  }

  render( ) {
    return (
        <div>
            { React.cloneElement(this.props.children)}
        </div>
    )
  }
}

export default MainLayout
