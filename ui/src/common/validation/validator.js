import validator from 'validator';
import ValidationError from './validation-error';

export const { isLength, isEmpty, matches } = validator;

export function createValidator(validateFn) {
  return obj => {
    const errors = [];
    const addError = (...args) => {
      errors.push(new ValidationError(...args));
    };
    validateFn(obj, addError);
    return errors;
  };
}

export function getErrors(errors, key) {
  return key ? errors.filter(e => e.key === key) : errors;
}

export function isValid(errors, key) {
  return getErrors(errors, key).length === 0;
}
