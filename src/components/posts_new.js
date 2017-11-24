import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

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
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  // Callback function to take the values and post data to the http://reduxblog.herokuapp.com/api/posts
  onSubmit(values) {
    // console.log(values); --> {title: "Chicken Recipe", categories: "Food", content: "How to cook a chicken"}
  }

  render() {
    const { handleSubmit } = this.props; // reduxForm function to validate the form

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
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter a title";
  }

  return errors;
}

export default reduxForm({
  validate: validate, // Validation of the form
  form: "PostsNewForm" // a unique name for the form
})(PostsNew);
