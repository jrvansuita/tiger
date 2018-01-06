
var DataStore = require('nedb');

function getCollection(name, indexes) {
  var db = new DataStore({ filename:  app.getPath('userData') + name, autoload: true });

  if (indexes)
  for (var i = 0; i < indexes.length; i++){
    db.ensureIndex(indexes[i]);
  }

  db.persistence.compactDatafile();

  return db;
}

const postsDb = createPostsDb();
const productsDb = createProductsDb();

function createProductsDb() {
  return  getCollection('/db/products.data',
  { fieldName: 'sku', unique: true },
  { fieldName: 'quantity', unique: false },
  { fieldName: 'selected', unique: false }
);
}

function createPostsDb() {
  return  getCollection('/db/posts.data');
}

module.exports = {
  products: function () {
    return productsDb;
  },

  posts: function () {
    return postsDb;
  }
};
