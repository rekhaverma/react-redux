import React from 'react'
import Button from "../landing/components/button.js"
import { login } from "../../redux/action/actions.js"
import { connect } from 'react-redux';
import TextField from "material-ui/TextField";
import { MuiThemeProvider } from "material-ui/styles";
import Grid from 'material-ui/Grid';
import { browserHistory } from 'react-router';



class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    let user = JSON.parse(localStorage.getItem('user'));
    if(user)
      browserHistory.push('/');
  }

  submit = (e) => {
    e.preventDefault();
    let email = this.email.value;
    let password = this.pswd.value;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(login(email, password));
    }
  }
  render() {
    console.log("===========login===============",this.props)
    return (
      <Grid container spacing={24}>
        <Grid item sm={12} md={12}>
          <MuiThemeProvider >
            <Grid container spacing={24}>
              <Grid item xs>
                <div>
                  <form action="" onSubmit={this.submit}>
                    <h1>Login</h1>
                    <span className="sign-in-account">or <a href="/register">Register your account</a></span>
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
          </Grid>
      </Grid>
    );
  }
}

export default LoginComponent = connect((state) =>
 {
  console.log("state",state)
  return { posts: state.posts || [], featured : state.featured || []}
})(LoginComponent);
