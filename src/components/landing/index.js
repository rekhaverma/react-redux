import React from "react";
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import Button from "./components/button.js";
import store from "../../redux/redux_store";
import { getActiveUserData } from "../../redux/action/actions.js"
import { logout } from "../../redux/action/actions.js"
import { connect } from 'react-redux';
import { withStyles } from "material-ui/styles";
import Typography from 'material-ui/Typography';


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
const UserData = styled.div`
  text-align: center
`;
const InnerWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const styles = theme => ({
  avatarCss: {
    width: "175px",
    height: "150px",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    borderRadius: "50%"
  }
});

class Landing extends React.Component {

  componentDidMount() {
    this.props.dispatch(getActiveUserData());
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  renderUserData = (data) => {
    console.log("data______",data)
    return(
      <UserData>
        <Typography>First Name: {data.firstName}</Typography>
        <Typography>Last Name: {data.lastName}</Typography>
        <Typography>Email: {data.email}</Typography>
        <Typography>username: {data.username}</Typography>
        <img src={data.imgUrl} className={this.props.classes.avatarCss} alt="Avatar"/>
        <Button onClick={ () => this.logOut()}>Logout</Button>
      </UserData>
    )
  }

  logOut = () => {
    this.props.dispatch(logout());
    browserHistory.push('/login');
  }
  render() {
    const currentUser = store.getState().statechange.user;
    console.log("store---------------",currentUser)
    return (
      <Wrapper>
        <InnerWrapper>
          {
            currentUser && currentUser.length > 0 ?
              currentUser.map((data, index) => {

                  return (
                      <div>
                          { this.renderUserData(data)}
                      </div>
                  )

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

export default withStyles(styles , { withTheme: true } )(connect(mapDispatchToProps)(Landing));
// export default withStyles(styles, { withTheme: true },connect(mapDispatchToProps)(Landing));
// export default withStyles(styles, { withTheme: true },connect(mapDispatchToProps)(Landing));