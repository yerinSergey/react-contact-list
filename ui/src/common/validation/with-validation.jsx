import React, { Component } from 'react';
import { isValid, getErrors } from './validator';

export default function withValidation(validator) {
  return WrappedComponent =>
    class Validation extends Component {
      constructor(props, context) {
        super(props, context);
        this.state = {
          validationErrors: [],
          touchedFields: [],
        };
        this.validate = this.validate.bind(this);
        this.isValid = this.isValid.bind(this);
        this.getValidationErrors = this.getValidationErrors.bind(this);
      }

      getValidationErrors(key) {
        return getErrors(this.state.validationErrors, key);
      }

      handleChange = ({ target: { name } }) => {
        const { touchedFields } = this.state;

        if (!touchedFields.includes(name)) {
          this.setState({ touchedFields: [...touchedFields, name] });
        }
      };

      validate(obj, key, cb) {
        let validationErrors;
        if (key) {
          // when key is specified, run validation and get errors related to specific key
          const errors = validator(obj).filter(e => e.key === key);

          // filter out old errors related to specific key and replace them with new errors
          validationErrors = this.state.validationErrors.filter(e => e.key !== key).concat(errors);
        } else {
          // just rerun validation and replace all errors
          validationErrors = validator(obj);
        }

        this.setState({ validationErrors }, () => {
          if (cb) {
            cb(validationErrors);
          }
        });
        return isValid(validationErrors, key);
      }

      clearValidationErrors() {
        this.setState({
          validationErrors: [],
        });
      }

      isValid(key) {
        return isValid(this.state.validationErrors, key);
      }

      isTouched = key => this.state.touchedFields.includes(key);

      render() {
        return (
          <WrappedComponent
            validate={this.validate}
            isValid={this.isValid}
            isTouched={this.isTouched}
            handleChange={this.handleChange}
            getValidationErrors={this.getValidationErrors}
            clearValidationErrors={this.clearValidationErrors}
            {...this.props}
          />
        );
      }
    };
}
