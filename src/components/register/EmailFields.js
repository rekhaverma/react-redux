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
  } else {
    let users = localStorage.getItem("users") || [];
    users = JSON.parse(users);

    console.log("email====>",values.email);
    console.log("users====>",users);
    let duplicateUser = users.filter(user => { return user.email === values.email; });
    console.log("duplicateUser====>",duplicateUser);
    if(duplicateUser.length) {
      errors.email='Email already exist with us'
    }
  }
  return errors
}

class EmailFields extends React.Component {

  nextStep = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  checkUniqueEmail = (event) => {
    // simulate server latency
    // let users = localStorage.getItem("users") || [];
    // users = JSON.parse(users);

    // console.log("email====>",event.target.value);
    // console.log("users====>",users);
    // let duplicateUser = users.filter(user => { return user.email === event.target.value; });
    // console.log("duplicateUser====>",duplicateUser);
    // if(duplicateUser.length) {
    //   alert("Email already exist with us");
    // }
  }

  submit = (values, dispatch, state) => {
    console.log("values", values);
    console.log("dispatch", dispatch);
    console.log("this", this);
    console.log("state", state);
    // let jsonValues = values;
    // jsonValues['imgUrl'] = this.state.imagePreviewUrl;
    // dispatch(saveImage(jsonValues));
    this.props.submit(values);
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
              <Field name="email" type="email" component={renderTextField} label="Email" onBlur={this.checkUniqueEmail} />
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