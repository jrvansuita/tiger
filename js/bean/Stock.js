module.exports = class Stock {
  constructor(value) {
    this.field = '';
    this.value = value ? value : '';
    this.refs = 0;
    this.total = 0;
  }
};