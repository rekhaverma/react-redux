import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from "./validate.js";
import renderTextField from "./renderTextField.js";
import Button from "../landing/components/button.js";



const AccountFields = props => {
  console.log("props",props)
  const { handleSubmit } = props;

  return (
    <div style={{
    width: '500px',
    height: '300px',
    position: 'absolute',
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center',
   }}>
    <form onSubmit={handleSubmit} style={{width: '450px'}}>
      <div>
        <Field
          name="firstName"
          component={renderTextField}
          label="First Name"
        />
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label="Last Name" />
      </div>
      <div>
        <Field name="city" component={renderTextField} label="City" />
      </div>
      <div>
        <Field name="address" component={renderTextField} label="Address" />
      </div>
      <div>
        <Button type="submit">Next</Button>
        <Button type="button" href="/login">
          Login
        </Button>
      </div>
    </form>
    </div>
  );
};



export default reduxForm({
  form: 'signupformwizard', // a unique identifier for this form
  validate,
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(AccountFields);