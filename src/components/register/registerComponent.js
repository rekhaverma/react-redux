import React from "react";
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';


import AccountFields from './AccountFields';
import UploadImage from './UploadImage';
import EmailFields from './EmailFields';
import ReviewSignUp from './ReviewSignUp';
import { register } from "../../redux/action/actions.js"

class RegisterComponent extends React.Component {

  state = {
    step: 1
  }

  nextPage = (values, formType) => {
    this.nextStep();
  }

  // Final submit value
  submit = (values) => {
    // event.preventDefault();
    // console.log("userJson",event);
    console.log("userJson",values);
    console.log("this.state.step2222",this);
    this.onSubmit(values);
  }
  onSubmit = (values) => {
     new Promise(resolve => {
        setTimeout(() => {
          this.props.dispatch(register(values));
          resolve();
        }, 500)
    });
  }
  // NEXT STEP  IN Signup Page Wizard
  nextStep = (values) =>  {
    // console.log("values in next state",values)
    this.setState({
      step : this.state.step + 1
    })
    console.log("values in nextStep", values)
  }

  // PREVIOUS STEP IN  Signup Page Wizard
  previousStep = () => {
    this.setState({
      step : this.state.step - 1
    })
  }


  render() {
    const { step } = this.state;
    // const { onSubmit } = this.props;
    console.log("this.state.step",this.state);
    return (
       <main>
          {step === 1 && <AccountFields onSubmit={this.nextPage} />}
        {step === 2 && (
          <Grid item xs={12} sm={6}>
            <UploadImage
              onSubmit={this.nextPage}
              previousPage={this.previousPage}
            />
          </Grid>
        )}
        {step === 3 && (
          <EmailFields
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {step === 4 && (
          <ReviewSignUp
            previousPage={this.previousPage}
            onSubmit={this.submit}
          />
        )}

      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(register(data))
  };
}

export default connect(mapDispatchToProps)(RegisterComponent);
