import React from 'react'
import { Field, reduxForm } from 'redux-form';
// import { saveImage } from "../../redux/action/actions.js"
// import { connect } from 'react-redux';


class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  submit = (values, dispatch, state) => {
    console.log("values", values);
    console.log("dispatch", dispatch);
    console.log("this", this);
    console.log("state", state);
    let jsonValues = values;
    jsonValues['imgUrl'] = this.state.imagePreviewUrl;
    // dispatch(saveImage(jsonValues));
    if(this.state.imagePreviewUrl) {
      this.props.submit(jsonValues);
    }
  }

   _handleImageChange = (e) => {
        e.preventDefault();
        console.log("thisssss",this)

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
            });
          }
          reader.readAsDataURL(file)
        }
  render() {

  const FileInput = ({ input, resetKey }) => {
    console.log("inputinputinputinputinput",this)
    const { value } = input;
    return (
      <input
        accept="image/*"
        id="raised-button-file"
        type="file"
        onChange={this._handleImageChange}
        value={value}
      />
    )
  }
    console.log("this.props",this.props);
    const { handleSubmit } = this.props;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={handleSubmit(this.submit)}>
          <Field name="fileInput"
            type="file"
            component={FileInput}
            />
          <button className="submitButton" type="submit">Upload Image</button>
        </form>
        <div className="imgPreview" ref={(ref)=> this.bannerImg = ref}>
          {$imagePreview}
        </div>
      </div>
    )
  }
}

const myReduxForm =  reduxForm({
  form: 'signupformwizard',
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(ImageUpload);

export default myReduxForm;