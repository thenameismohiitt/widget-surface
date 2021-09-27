import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  LoginSchema,
  LoginSchemaValidation,
} from '../../common/utils/schema/LoginValidationSchema';
import ClipLoader from 'react-spinners/ClipLoader';

const css = {
  margin: '-1px 5px',
  display: 'inline-block',
};

class LoginForm extends Component {
  handleSubmit = values => {
    this.props.login(values);
  };

  render() {
    const { loginPending } = this.props;
    return (
      <Formik
        initialValues={LoginSchema}
        validationSchema={LoginSchemaValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          this.handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        <Form>
          <div className="form-group mb-3">
            <div className="input-group input-group-merge input-group-alternative">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="ni ni-email-83"></i>
                </span>
              </div>
              <Field name="email" className="form-control" placeholder="Email" type="email" />
            </div>
            <p style={{ color: '#dc3545' }}>
              <ErrorMessage name="email" />
            </p>
          </div>
          <div className="form-group">
            <div className="input-group input-group-merge input-group-alternative">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="ni ni-lock-circle-open"></i>
                </span>
              </div>
              <Field
                name="password"
                className="form-control"
                placeholder="Password"
                type="password"
              />
            </div>
            <p style={{ color: '#dc3545' }}>
              <ErrorMessage name="password" />
            </p>
          </div>
          <div className="text-center">
            <button
              disabled={loginPending}
              type="submit"
              className="btn my-4"
              style={{ background: '#1ba7ae', color: '#ffff' }}
            >
              Sign in
              <ClipLoader css={css} size="13px" color={'#fffff'} loading={loginPending} />
            </button>
          </div>
        </Form>
      </Formik>
    );
  }
}

export default LoginForm;
