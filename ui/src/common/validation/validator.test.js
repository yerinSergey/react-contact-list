import { getErrors, isValid, createValidator } from './validator';

describe('Validator', () => {
  it('should get errors', () => {
    const key = 'key';
    const errors = [{ key }];

    expect(getErrors(errors, key)).toEqual(errors);
  });

  it('should check is valid', () => {
    const key = 'key';
    const errors = [{ key }];

    expect(isValid(errors, key)).toBeFalsy();
    expect(isValid([], key)).toBeTruthy();
  });

  it('should create validator', () => {
    const validatorFn = jest.fn();
    const validator = createValidator(validatorFn);

    expect(validator({})).toEqual([]);
  });

  it('should create validator and return error', () => {
    const key = 'key';
    const message = 'message';
    const type = 'type';
    const validatorFn = (state, addError) => addError(key, type, message);
    const validator = createValidator(validatorFn);

    expect(validator({})).toEqual([{ key, message, type }]);
  });
});
