var DataStore = require('nedb');

function getCollection(name, indexes) {
  var path = app.getPath('userData') + name;

  var db = new DataStore({
    filename: path,
    autoload: true
  });

  //console.log(path);

  if (indexes)
    for (var i = 0; i < indexes.length; i++) {
      db.ensureIndex(indexes[i]);
    }

  db.persistence.compactDatafile();

  return db;
}

const postsDb = createPostsDb();
const productsDb = createProductsDb();
const templatesDb = createTemplatesDb();

function createProductsDb() {
  return getCollection('/db/products.data', {
    fieldName: 'sku',
    unique: true
  }, {
    fieldName: 'quantity',
    unique: false
  }, {
    fieldName: 'selected',
    unique: false
  });
}

function createPostsDb() {
  return getCollection('/db/posts.data');
}

function createTemplatesDb() {
  return getCollection('/db/templates.data');
}

module.exports = {
  products: function() {
    return productsDb;
  },

  posts: function() {
    return postsDb;
  },

  templates: function() {
    return templatesDb;
  }
};