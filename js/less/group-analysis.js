var GroupCriteria = require(_jsdir + '/bean/GroupCriteria.js');


module.exports = {

  analyse(products) {
    var criteria = new GroupCriteria();

    products.forEach(function(item, i) {
      criteria.addCategory(item.category);
      criteria.addBrand(item.brand);
      criteria.addColor(item.color);
      criteria.addGender(item.gender);
    });

    return criteria;
  }

};