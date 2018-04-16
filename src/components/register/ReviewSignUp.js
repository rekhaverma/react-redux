import React from "react";
import { reduxForm } from 'redux-form';
import store from '../../redux/redux_store';



class ReviewSignUp extends React.Component{


  render() {
    // const { handleSubmit } = this.props;
    let enteredData  = store.getState().form.signupformwizard.values;

    return (
      <div>
        <h2>Confirm Registration</h2>
          <div>
          <div>{enteredData.firstName}</div>
          <div>{enteredData.lastName}</div>
          <div>{enteredData.email}</div>
          <div style={{width:'300px',height:'400px'}}>
            <img src={enteredData.imgUrl} />
          </div>
          <button onClick={()=> this.props.onSubmit(enteredData)}>Submit</button>
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

