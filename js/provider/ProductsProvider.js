const Product = require(_jsdir + 'bean/Product.js');
const db = require(_jsdir + 'db/DataBase.js');
const requests = require(_jsdir + 'util/requests.js');
const msg = require(_jsdir + 'util/msg.js');
const cnt = require(_jsdir + 'res/cnt.js');

var xmlUrl = 'https://www.boutiqueinfantil.com.br/media/feed/googleshopping.xml';

module.exports = {
  init : function(){
    //Attr used to do the dynamic search
     this.searchBundle = {};

     //Já é iniciado como vazio.
     //this.previousSearchText = '';
     //this.searchCallBack = null;
  },

  updateAll : function (){
    requests.getXml(xmlUrl, function (xml){
      msg.loading();

      var storage = db.products();
      var items = xml.getElementsByTagName('item');

      for(var i=0; i < items.length; i++){
        var it = items[i];
        var product = new Product(
          getVal(it, 'id'),
          getVal(it, 'title'),
          getVal(it, 'description'),
          getVal(it, 'product_type'),
          getVal(it, 'price'),
          getVal(it, 'quantity'),
          getVal(it, 'gender'),
          getVal(it, 'brand'),
          getVal(it, 'color'),
          getVal(it, 'link'),
          getVal(it, 'image_link'));

          //Upserting Operation
          storage.update({ sku: product.sku }, product, {upsert : true});
        }
        msg.sucess(cnt.allProductsUpdated);
      });
    },

    setSearchCallBack(callback){
      searchCallBack = callback;
    },

    toogleSearchAttr: function(field, value){
      var previous = this.searchBundle[field];

      if (previous === value){
        delete this.searchBundle[field];
      }else{
        this.searchBundle[field] = value;
      }
    },

    hasAttrs(){
      return !jQuery.isEmptyObject(this.searchBundle);
    },

    searchAttr(field, value){
      this.toogleSearchAttr(field,value);
      this.search(this.previousSearchText);
    },

    search: function(searchText){
      this.previousSearchText = searchText;

      let query = {};

      if (searchText){
        query.$or = [{ sku: {$regex: new RegExp(searchText, 'i')} },
        { title: {$regex: new RegExp(searchText, 'i')} },
        { description: {$regex: new RegExp(searchText, 'i')}}];
      }

      if (this.hasAttrs()){
        query.$and = [this.searchBundle];
      }

      db.products().find(query).sort({ quantity: -1 }).exec(function (err, docs) {
        if (err){
          msg.error(err);
        }else{
          if (searchCallBack){
            searchCallBack(docs);
          }
        }
      });
    },

    findSkus(skus, callback){
      db.products().find({sku: {$in: skus}})
      .sort({ quantity: -1 })
      .exec(function (err, docs) {
        if (err){
          msg.error(err);
        }else{
          if (callback){
            callback(docs);
          }
        }
      });
    }



  };




  function getVal(item, name) {
    return item.getElementsByTagName(name)[0].textContent;
  }
