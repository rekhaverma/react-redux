import React from 'react'
// import { Field, reduxForm } from 'redux-form'
// import renderTextField from "../register/renderTextField.js";
import Button from "../landing/components/button.js"
// import TextField from 'material-ui/TextField';
import { login } from "../../redux/action/actions.js"
import { connect } from 'react-redux';
// import React from "react";
// import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import { FormGroup, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import { withStyles } from "material-ui/styles";
// import "../form.css";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Grid from 'material-ui/Grid';


const styles = theme => ({
  container: {
    /*display: "flex",
    flexDirection: "column"*/
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  menu: {
    width: 200
  },
  centerDiv: {
    margin: 'auto',
    width: 400
  },
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class LoginForm extends React.Component{

    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            Email: '',
            password: '',
        };
    }

    handleChange(e) {
        const { name, value } = e.target;
        console.log("this",this)
        // this.setState({ [name]: value });
    }

    handleSubmit(e) {
        // e.preventDefault();
        console.log("this==>",this);
        // this.setState({ submitted: true });
        // const { username, password } = this.state;
        // const { dispatch } = this.props;
        // if (username && password) {
        //     dispatch(login(username, password));
        // }
    }

    render() {
        const {classes} =this.props;
        return (
           <MuiThemeProvider >
        <Grid container spacing={24}>
        <Grid item xs>
          <div>
            <form id="addUser" action="" onSubmit={this.handleSubmit}>
              <h1>Login
              </h1>
              <span className="sign-in-account">or <a href="/login">sign in to your account</a></span>
              <div>
                <Grid item xs={12} sm={6}>
                    <TextField
                      id="email"
                      type="email"
                      label="Email"
                      margin="normal"
                      fullWidth
                      inputRef = {(ref) => {this.email = ref}}
                      required={true}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      id="password"
                      label="Password"
                      margin="normal"
                      inputRef = {(ref) => {this.pswd = ref}}
                      fullWidth
                    />
                </Grid>
              <Grid container>
                <Grid item xs={6} sm={4}>
                  <Button raised color="primary" type="submit">
                    {" "}
                    Login {" "}
                  </Button>
                </Grid>
              </Grid>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
      </MuiThemeProvider>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapDispatchToProps)(LoginForm);

// export default LoginForm