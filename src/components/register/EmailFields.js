import React from "react";
import Grid from 'material-ui/Grid';
import { Field, reduxForm } from 'redux-form';
import renderTextField from "./renderTextField.js";
import Button from "../landing/components/button.js";
import { connect } from 'react-redux';
// import { setEmailFields } from "../../redux/action/actions.js"
import store from '../../redux/redux_store';




const validate = values => {
  console.log("values===>",values)
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class EmailFields extends React.Component {

  nextStep = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  checkUniqueEmail = (email) => {
    // simulate server latency
    let users = localStorage.getItem("users") || [];
    users = users && users.length > 0 ? JSON.parse(users) : [];

    let duplicateUser = users.filter(user => { return user.email === email; });
    if(duplicateUser.length) {
      alert("Email already exist with us");
      return false
    }
    return true;
  }

  submit = (values, dispatch, state) => {
    // Check for unique email
    let uniqEmail = this.checkUniqueEmail(values.email)
    if(uniqEmail) {
      if(values.confirm_password == values.password) {
        this.props.submit(values);
      } else {
        alert("Password values are not same");
      }
    }
  }

  render() {
    console.log("store---------------",store.getState())
    const { handleSubmit } = this.props;
    return (
       <Grid container spacing={24}>
          <Grid item xs>
            <form onSubmit={handleSubmit(this.submit)}>
              <Field
                name="username"
                type="text"
                component={renderTextField}
                label="Username"
              />
              <Field name="email" type="email" component={renderTextField} label="Email" />
              <Field name="password" type="password" component={renderTextField} label="Password" />
              <Field name="confirm_password" type="password" component={renderTextField} label="Confirm Password" />
              <div>
                <Button type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Grid>
      </Grid>
    )

  }

}

const myReduxForm = reduxForm({
  form: 'signupformwizard', // a unique identifier for this form
  validate,
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
}) ((EmailFields));


export default connect()(myReduxForm);