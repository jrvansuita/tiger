const Product = require(_jsdir + 'bean/Product.js');
const db = require(_jsdir + 'db/DataBase.js');
const requests = require(_jsdir + 'util/requests.js');


var xmlUrl = 'https://www.boutiqueinfantil.com.br/media/feed/googleshopping.xml';

module.exports = {
  init: function() {
    //Attr used to do the dynamic search

    if (jQuery.isEmptyObject(Keep.searchAttrs())) {
      this.searchBundle = {};
    } else {
      this.searchBundle = Keep.searchAttrs();
    }

    //Já é iniciado como vazio.
    //this.previousSearchText = '';
    //this.searchCallBack = null;
  },

  clear() {
    this.searchBundle = {};
    this.previousSearchText = '';
  },

  updateAll: function() {
    requests.getXml(xmlUrl, function(xml) {
      msg.loading();

      var storage = db.products();
      var items = xml.getElementsByTagName('item');

      for (var i = 0; i < items.length; i++) {
        var it = items[i];

        var title = getVal(it, 'title');

        var product = new Product(
          getVal(it, 'id'),
          title,
          getVal(it, 'description'),
          getCategory(getVal(it, 'product_type')),
          getVal(it, 'price'),
          getVal(it, 'quantity'),
          getVal(it, 'gender'),
          getBrand(title, getVal(it, 'brand')),
          getVal(it, 'color'),
          getVal(it, 'link'),
          getVal(it, 'image_link'));

        //Upserting Operation
        storage.update({
          sku: product.sku
        }, product, {
          upsert: true
        });
      }
      msg.sucess(cnt.allProductsUpdated);
    });
  },

  setSearchCallBack(callback) {
    searchCallBack = callback;
  },

  toogleSearchAttr: function(field, value) {
    var previous = this.searchBundle[field];

    if (previous === value) {
      delete this.searchBundle[field];
    } else {
      this.searchBundle[field] = value;
    }

    Keep.searchAttrs(this.searchBundle);
  },

  hasAttrs() {
    return !jQuery.isEmptyObject(this.searchBundle);
  },

  searchAttr(field, value) {
    this.toogleSearchAttr(field, value);
    this.search(this.previousSearchText);
  },

  search: function(searchText) {
    this.previousSearchText = searchText;

    let query = {};
    query.$and = [];

    if (searchText) {
      query.$or = [{
          sku: {
            $regex: new RegExp(searchText, 'i')
          }
        },
        {
          title: {
            $regex: new RegExp(searchText, 'i')
          }
        },
        {
          description: {
            $regex: new RegExp(searchText, 'i')
          }
        }
      ];
    }

    if (this.hasAttrs()) {
      query.$and.push(this.searchBundle);
    }

    query.$and.push({
      quantity: {
        $gt: parseInt(Keep.minimumStock())
      }
    });


    db.products().find(query).sort({
      quantity: -1
    }).exec(function(err, docs) {
      if (err) {
        msg.error(err);
      } else {
        if (searchCallBack) {
          searchCallBack(docs);
        }
      }
    });
  },

  findSkus(skus, callback) {
    db.products().find({
        sku: {
          $in: skus
        }
      })
      .sort({
        quantity: -1
      })
      .exec(function(err, docs) {
        if (err) {
          msg.error(err);
        } else {
          if (callback) {
            callback(docs);
          }
        }
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