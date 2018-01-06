const util = require(_jsdir + 'util/utils.js');

module.exports = class Product{
  constructor(sku, title, description, category, price, quantity, gender, brand, color, url, imageUrl){
    this.sku = sku;
    this.title = title;
    this.brand = assertUp(brand);
    this.color = assertUp(color);
    this.description = description;
    this.category = assertCategory(category);
    this.price = price;
    this.quantity = parseInt(quantity);
    this.url = url;
    this.imageUrl = imageUrl;
    this.gender = assertUp(gender);
    // this.selected = false;
  }
};

function assertCategory(value){
  value = assert(value);

  var splitted = value.split('> ');
  return util.upLetters(splitted[splitted.length -1]);
}

function assertUp(value){
  return util.upLetters(assert(value));
}

function assert(value){
  return value == undefined || value.length == 0 ? 'not set': value;
}
