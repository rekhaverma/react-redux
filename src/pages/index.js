import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import withRoot from "../components/withRoot";
import Header from "../components/header/headerComponent";
import RegisterComponent from "../components/register/registerComponent";

const styles = {
  root: {
    textAlign: "center",
    paddingTop: 200
  }
};

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return( <div>
      <Header />
      <RegisterComponent />
    </div>);
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
