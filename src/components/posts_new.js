import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    // const { meta } = field; // field.meta = meta
    // const { meta : {touched, error}} = field; // meta.touched = touched
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : '' }`;
    return (
      <div className={className} >
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}  // so we don't have to wire up eventhandlers and props
          // onChange={field.input.onChange}
          // onFocus={field.input.onFocus}
          // onBlur={field.input.onBlur}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  /* User submits formReducer ->
    Validate formReducer ->
    Call 'onSubmit' ->
    Call an action to make API request ->
    Wait ->
    After success, programmatically navigate the user to post list */

  // Callback function to take the values and post data to the http://reduxblog.herokuapp.com/api/posts
  onSubmit(values) {
    // console.log(values); --> {title: "Chicken Recipe", categories: "Food", content: "How to cook a chicken"}
    this.props.createPost(values, () => {
      this.props.history.push('/'); // Go back to the root
    });
  }

  // reduxForm handles the state and validation of the form, doesn't handles how components are rendered, or POST form data
  render() {
    const { handleSubmit } = this.props; // reduxForm function

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}
// Three different states of the form
// pritine, touched, invalid
function validate(values) {
  //console.log(values); --> {title: "I have a dream", categories: "Publitics", content: "I have a dream when I was young..."}
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter a title";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate: validate, // Validation of the form, validate function was called automatically when user submits the form
  form: "PostsNewForm" // a unique name for the form
})(
  connect(null, { createPost })(PostsNew)
);
