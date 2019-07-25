import { validateFullName, validateRequired, validatePhone } from './validators';

const addError = jest.fn();

describe('validators', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate required field', () => {
    validateRequired('name', '  ', addError);
    expect(addError.mock.calls[0]).toEqual(['name', 'required', 'Field is required']);

    jest.clearAllMocks();
    validateFullName('name', ' 1 2', addError);
    expect(addError).not.toHaveBeenCalled();
  });

  it('should validate full name', () => {
    validateFullName('name', '  ', addError);
    expect(addError.mock.calls[0]).toEqual(['name', 'required', 'Last Name is required']);

    jest.clearAllMocks();
    validateFullName('name', ' 1 2', addError);
    expect(addError).not.toHaveBeenCalled();

    jest.clearAllMocks();
    validateFullName('name', '1 2 3', addError);
    expect(addError).not.toHaveBeenCalled();
  });

  it('should validate phone without errors', () => {
    validatePhone('phone', '1234567891011', addError);
    expect(addError).not.toHaveBeenCalled();
  });

  it('should validate invalid phone number', () => {
    validatePhone('phone', 'ac', addError);
    expect(addError.mock.calls[0]).toEqual(['phone', 'invalid', 'Please enter a correct number']);
  });
});
