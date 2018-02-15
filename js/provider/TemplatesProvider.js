var MongoDb = require(_jsdir + 'mongoose/MongoDb.js');
const db = require(_jsdir + 'db/DataBase.js');


module.exports = {
  init: function() {},

  clear() {},

  search: function() {

  },

  findSkus(skus, callback) {

  },

  // updateAll() {
  //   msg.loading();
  //   TemplatesMDb.find({}, function(err, docs) {
  //     db.templates().remove({}, {
  //       multi: true
  //     }, function(err, numRemoved) {
  //
  //       docs.forEach(function(doc) {
  //         var item = doc._doc;
  //         delete item._id;
  //
  //         db.templates().insert(item);
  //       });
  //
  //       msg.sucess(cnt.allTemplatesUpdated);
  //     });
  //   });
  //
  // }
};