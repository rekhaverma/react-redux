import React from 'react';
import TextField from "material-ui/TextField";


const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    helperText={touched && error && "Required" }
    {...input}
    {...custom}
    placeholder={label}
    fullWidth
  />
)

export default renderTextField