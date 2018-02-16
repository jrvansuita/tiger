var Util = require(_jsdir + 'util/utils.js');

var weblink = 'http://www.boutiqueinfantil.com.br';
var link;

module.exports = {

  build: function(criteria, callback) {
    link = weblink;

    if (criteria.hasSameBrand()) {
      fmt(Util.removerAcentos(criteria.getBrands()[0]).toUpperCase());
    } else {
      fmt('products');
    }

    if (criteria.hasSameGender()) {
      fmt(genderUrl(criteria.getGenders()[0]));
    }

    callback(link + categoryFilter(criteria.getCategories()), criteria);
  },

};

function fmt(s) {
  var val = s.replace(/ /g, '-');

  link += s ? '/' + val : '';
}


function genderUrl(s) {
  if (s == 'Male') {
    return 'genero/masculino';
  } else if (s == 'Female') {
    return 'genero/feminino';
  } else if (s == 'Unisex') {
    return 'genero/unissex+masculino+feminino';
  } else {
    return '';
  }
}


function categoryFilter(categories) {
  var dep = 'departamento';
  var cat = [];

  categories.forEach(function(item, i) {

    if (is(item, 'body')) {
      cat.push('body');
    } else if (is(item, 'vestido')) {
      cat.push('vestido');
    } else if (is(item, 'macaquinho')) {
      cat.push('macaquinho');
    } else if (is(item, 'pijama')) {
      cat.push('pijama');
    } else if (is(item, 'conjunto')) {
      cat.push('conjunto');
    } else if (is(item, 'regata')) {
      cat.push('regata');
    } else if (is(item, 'bermuda')) {
      cat.push('bermuda');
    } else if (is(item, 'blusa')) {
      cat.push('blusa');
    } else if (is(item, 'manga')) {
      cat.push('blusa-manga-longa');
    } else if (is(item, 'macac')) {
      cat.push('macacao');
    } else if (is(item, 'sapato')) {
      cat.push('tenis+sandalia+sapatilha');
    } else if (is(item, 'calçados')) {
      cat.push('sandalia');
    } else if (is(item, 'sapatilhas')) {
      cat.push('sapatilha');
    } else if (is(item, 'tenis')) {
      cat.push('tenis');
    } else {
      //cat.push(item);
    }
  });

  //Remove duplicates
  cat = cat.filter(function(value, index, array) {
    return array.indexOf(value) == index;
  });

  return cat.length > 0 ? '/' + dep + '/' + cat.join('+') : '';
}

function is(s, f) {
  if (s instanceof Array) {
    s.forEach(function(item, index) {
      if (item.toLowerCase().contains(f))
        return true;
    });
    return false;
  } else {
    return s.toLowerCase().contains(f);
  }
}