
function _keepStr(k, v, d){
  if (v === undefined){
    var r = localStorage.getItem(k);
    return (r === null || r == '') && d != null ? d : r;
  }else{
    localStorage.setItem(k, v);
    return v;
  }
}

function _keepArr(k, v){
  if (v === undefined){
    var r = localStorage.getItem(k);
    return r ? r.split(',') : [];
  }else{
    localStorage.setItem(k, v.join(','));
  }
}

function _keepJson(k, v){
  if (v === undefined){
    return JSON.parse(localStorage.getItem(k));
  }else{
    localStorage.setItem(k, JSON.stringify(v));
  }
}

module.exports = {

  currentPage : function(value){
    return _keepStr('last-visited', value);
  },

  selectedProducts : function(values){
    return _keepArr('selected-products', values);
  },

  shortBuyUrl : function(value){
    return _keepStr('short-buy-url', value) == 'true';
  },

  magicLink : function(value){
    return _keepStr('magic-link', value) == 'true';
  },

  futureDate : function(value){
    return _keepStr('future-date', value) == 'true';
  },

  buyUrl : function(value){
    return _keepStr('buy-url', value);
  },

  campaignSource : function(value){
    return _keepStr('campaign-source', value, 'facebook');
  },

  campaignMedium : function(value){
    return _keepStr('campaign-medium', value, 'tiger');
  },

  campaignName : function(value){
    return _keepStr('campaign-name', value);
  },

  checkIn : function(value){
    return _keepStr('check-in', value, true) == 'true';
  },

  lastExchangeFacebookToken(pageId, time){
    return parseInt(_keepStr('last-exchange-token-' + pageId, time, 0));
  },

  facebookToken(id, token){
    return _keepStr('facebook-token-' + id, token);
  },

  lastProductSearch : function(value){
    return _keepStr('last-product-search', value);
  },

  minimumStock : function(value){
    return _keepStr('minimum-stock', value, 0);
  },

  searchAttrs : function(value){
    return _keepJson('search-attrs', value);
  }

  // lastAttrsSearch : function(values){
  //   return _keepArr('last-attrs-search', values);
  // },
  //
  // addLastAttrsSearch : function(field, value){
  //   var arr = this.lastAttrsSearch();
  //   var attr = field + '-'  + value;
  //
  //   if (arr.indexOf(attr) == -1){
  //     arr.push(attr);
  //   }
  //
  //   this.lastAttrsSearch(arr);
  // },
  //
  // removeLastAttrsSearch : function(field, value){
  //   var arr = this.lastAttrsSearch();
  //   var attr = field + '-'  + value;
  //
  //   var index = arr.indexOf(attr);
  //   if (index > -1){
  //     arr.splice(index, 1);
  //   }
  //
  //   this.lastAttrsSearch(arr);
  // }
};
