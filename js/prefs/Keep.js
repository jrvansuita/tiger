function _keepStr(k, v, d) {
  if (v === undefined) {
    var r = localStorage.getItem(k);
    return (r === null || r == '') && d != null ? d : r;
  } else {
    localStorage.setItem(k, v);
    return v;
  }
}

function _keepArr(k, v) {
  if (v === undefined) {
    var r = localStorage.getItem(k);
    return r ? r.split(',') : [];
  } else {
    localStorage.setItem(k, v.join(','));
  }
}

function _keepJson(k, v) {
  if (v === undefined) {
    return JSON.parse(localStorage.getItem(k));
  } else {
    localStorage.setItem(k, JSON.stringify(v));
  }
}

module.exports = {


  lastRefresh: function(value) {
    return parseInt(_keepStr('last-refresh', value, 0));
  },

  currentPage: function(value) {
    return _keepStr('last-visited', value);
  },

  selectedProducts: function(values) {
    return _keepArr('selected-products', values);
  },

  // shortBuyUrl: function(value) {
  //   return _keepStr('short-buy-url', value, 'true') == 'true';
  // },

  // magicLink: function(value) {
  //   return _keepStr('magic-link', value, 'true') == 'true';
  // },

  futureDate: function(value) {
    return _keepStr('future-date', value) == 'true';
  },

  buyUrl: function(value) {
    return _keepStr('buy-url', value);
  },

  campaignSource: function(value) {
    return _keepStr('campaign-source', value, 'facebook');
  },

  campaignMedium: function(value) {
    return _keepStr('campaign-medium', value, 'tiger');
  },

  campaignName: function(value) {
    return _keepStr('campaign-name', value);
  },

  // checkIn: function(value) {
  //   return _keepStr('check-in', value, 'true') == 'true';
  // },

  lastExchangeFacebookToken(time) {
    return parseInt(_keepStr('last-fb-exchange-token', time, 0));
  },

  facebookToken(token) {
    return _keepStr('fb-token', token);
  },

  facebookPageName(name) {
    return _keepStr('fb-page-name', name, 'lojaboutiqueinfantil');
  },

  facebookPageId(id) {
    return _keepStr('fb-page-id', id, '1615033445450026');
  },

  tigerClientId(clientId) {
    return _keepStr('tiger-client-id', clientId, '396005934189478'); //Default
  },

  tigerClientSecret(clientSecret) {
    return _keepStr('tiger-secret-client', clientSecret, 'a66742f32f2b702708681af73d3a9b74'); //Default
  },

  instaUser(user) {
    return _keepStr('insta-user', user);
  },

  instaPass(pass) {
    return _keepStr('insta-pass', pass);
  },

  lastProductSearch: function(value) {
    return _keepStr('last-product-search', value);
  },

  minimumStock: function(value) {
    return _keepStr('minimum-stock', value, 0);
  },

  searchAttrs: function(value) {
    return _keepJson('search-attrs', value);
  }


};