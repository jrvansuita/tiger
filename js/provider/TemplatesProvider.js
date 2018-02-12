var MongoDb = require(_jsdir + 'mongoose/MongoDb.js');
const db = require(_jsdir + 'db/DataBase.js');


module.exports = {
  init: function() {},

  clear() {},

  search: function() {

  },

  findSkus(skus, callback) {

  },

  updateAll() {
    msg.loading();
    TemplatesMDb.find({}, function(err, docs) {
      db.templates().remove({}, {
        multi: true
      }, function(err, numRemoved) {

        docs.forEach(function(doc) {
          var item = doc._doc;
          delete item._id;

          db.templates().insert(item);
        });

        msg.sucess(cnt.allTemplatesUpdated);
      });
    });

  }
};




function getVal(item, name) {
  return item.getElementsByTagName(name)[0].textContent;
}

function getBrand(name, brand) {
  var a = name.split('-');

  if (a.length > 1) {
    brand = a[a.length - 1].trim();
  }

  return brand;
}

function getCategory(category) {
  //remove numbers
  category = category.replace(/\d+/g, '').replace(/por/gi, '').trim();
  return category;
}