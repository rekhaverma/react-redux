const validate = values => {
  console.log("values",values)
  const errors = {}
  const requiredFields = [
    'firstName',
    'address',
    'city',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  console.log("errors",errors)
  return errors
}

export default validate;