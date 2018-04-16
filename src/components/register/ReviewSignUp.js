import React from "react";
import { reduxForm } from 'redux-form';
import store from '../../redux/redux_store';
import Button from "../landing/components/button.js";
import Typography from 'material-ui/Typography';
import styled from 'styled-components';


const UserData = styled.div`
  text-align: center
`;



class ReviewSignUp extends React.Component{


renderUserData = (data) => {
    console.log("data______",data)
    return(
      <UserData>
        <Typography>First Name: {data.firstName}</Typography>
        <Typography>Last Name: {data.lastName}</Typography>
        <Typography>Email: {data.email}</Typography>
        <Typography>username: {data.username}</Typography>
        <img src={data.imgUrl} alt="Avatar"/>
        <Button onClick={()=> this.props.onSubmit(data)}>Submit</Button>
      </UserData>
    )
  }

  render() {
    // const { handleSubmit } = this.props;
    let enteredData  = store.getState().form.signupformwizard.values;

    return (
      <div>
        <h2>Confirm Registration</h2>
          <div>
            { this.renderUserData(enteredData)}
        </div>
      </div>
    )
  }
}


export default reduxForm({
  form: 'signupformwizard', // a unique identifier for this form
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
}) ((ReviewSignUp));

