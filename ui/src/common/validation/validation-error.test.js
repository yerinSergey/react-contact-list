import ValidationError from './validation-error';

describe('Validation Error', () => {
  it('should create validation error', () => {
    const key = 'key';
    const type = 'type';
    const message = 'message';
    const validationError = new ValidationError(key, type, message);

    expect(validationError).toEqual({
      key,
      type,
      message,
    });
  });
});
