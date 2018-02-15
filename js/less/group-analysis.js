var GroupCriteria = require(_jsdir + '/bean/GroupCriteria.js');


module.exports = {

  analyse(items) {
    var criteria = new GroupCriteria();

    items.forEach(function(item, i) {
      var p = item.product;

      criteria.addCategory(p.category);
      criteria.addBrand(p.brand);
      criteria.addColor(p.color);
      criteria.addGender(p.gender);
    });

    return criteria;
  }

};