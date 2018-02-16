module.exports = class GroupCreteria {

  constructor() {
    this.gender = {};
    this.color = {};
    this.brand = {};
    this.category = {};
  }

  hasSameCategory() {
    return this.hasSame(this.category);
  }

  addCategory(val) {
    this.add(this.category, val);
  }

  getCategories() {
    return this.getArr(this.category);
  }

  hasSameBrand() {
    return this.hasSame(this.brand);
  }

  addBrand(val) {
    this.add(this.brand, val);
  }

  getBrands() {
    return this.getArr(this.brand);
  }

  hasSameColor() {
    return this.hasSame(this.color);
  }

  addColor(val) {
    this.add(this.color, val);
  }

  getColors() {
    return this.getArr(this.color);
  }

  hasSameGender() {
    return this.hasSame(this.gender);
  }

  addGender(val) {
    this.add(this.gender, val);
  }

  getGenders() {
    return this.getArr(this.gender);
  }

  add(obj, val) {
    obj[val] = obj[val] === undefined ? 1 : obj[val] + 1;
  }

  hasSame(obj) {
    return this.getArr(obj).length == 1;
  }

  getArr(obj) {
    return Object.keys(obj).map(function(key) {
      return key;
    });
  }


  matching(is) {
    var attrs = Object.keys(this).map(function(key) {
      return key;
    });

    var sames = [];

    for (var i = 0; i < attrs.length; i++) {
      var item = attrs[i];
      if (this.hasSame(this[item]) == is) {
        sames.push(item);
      }
    }

    return sames;
  }
};