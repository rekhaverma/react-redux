import React from "react";
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import Button from "./components/button.js";
import store from "../../redux/redux_store";
import { getActiveUserData } from "../../redux/action/actions.js"
import { logout } from "../../redux/action/actions.js"
import { connect } from 'react-redux';

const Wrapper = styled.div`
  display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
`;
const InnerWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

class Landing extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  componentDidMount() {
    this.props.dispatch(getActiveUserData());
  }

  logOut = () => {
    this.props.dispatch(logout());
    browserHistory.push('/login');
  }
  render() {
    const currentUser = store.getState().statechange.user;
    console.log("store---------------",store.getState().statechange.user)
    return (
      <Wrapper>
        <InnerWrapper>
          {currentUser && currentUser.length > 0 ?  currentUser.map((data) => {
            return [
              <div>{data.firstName}</div>,
              <div>{data.username}</div>,
              <div>{data.lastName}</div>,
              <div style={{height:'300px',width:'400px'}}><img src={data.imgUrl} alt="avatar"/></div>,
              <Button onClick={ () => this.logOut()}>Logout</Button>
            ]
          }) :
          <div>
            <Button onClick={() => browserHistory.push('/login') } > Login</Button>
            <Button onClick={() => browserHistory.push('/register') }>Register</Button>
          </div>
        }
        </InnerWrapper>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getActiveUserData: (data) => dispatch((data))
  };
}

export default connect(mapDispatchToProps)(Landing);