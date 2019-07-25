import { matches, isEmpty } from './validator';

const PHONE_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export const validatePhone = (name, phone, addError) => {
  if (!matches(phone || '', PHONE_REGEX)) {
    return addError(name, 'invalid', 'Please enter a correct number');
  }
};

export const validateRequired = (name, value, addError) => {
  if (isEmpty((value || '').trim())) {
    addError(name, 'required', 'Field is required');
  }
};

export const validateFullName = (name, value, addError) => {
  const lastName = (value || '').trim().split(' ')[1];

  if (isEmpty((lastName || ''))) {
    addError(name, 'required', 'Last Name is required');
  }
};

export default {
  validatePhone,
  validateFullName,
};
