export default class ValidationError {
  constructor(key, type, message) {
    this.key = key;
    this.type = type;
    this.message = message;
  }
}
