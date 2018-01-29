var Util = require(_jsdir + 'util/utils.js');

var weblink = 'http://www.boutiqueinfantil.com.br';
var link;

module.exports = {

  build: function(items, callback) {
    link = weblink;

    var sameBrand = true;
    var brand = items[0].product.brand;
    var sameGender = true;
    var gender = items[0].product.gender;

    var categories = [];

    items.forEach(function(item, i) {

      if (brand != item.product.brand) {
        sameBrand = false;
        brand = item.product.brand;
      }

      if (gender != item.product.gender) {
        sameGender = false;
        gender = item.product.gender;
      }

      categories.push(item.product.category);
    });

    if (sameBrand) {
      brand = fmt(Util.removerAcentos(brand).toUpperCase());
    } else {
      fmt('products');
    }

    if (sameGender) {
      fmt(genderUrl(gender));
    }

    callback(link + categoryFilter(categories), brand);
  },

};

function fmt(s) {
  var val = s.replace(/ /g, '-');

  link += s ? '/' + val : '';

  return val;
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