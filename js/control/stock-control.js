var provider = require(_jsdir + 'provider/ProductsProvider.js');
var Stock = require(_jsdir + 'bean/Stock.js');
var tinycolor = require('tinycolor2');

$(document).ready(function() {
  provider.init();
  provider.setSearchCallBack(onSearchCallBack);
  loadAllValues();

  restoreKeepValues();
});


function loadAllValues() {
  provider.clear();
  provider.search();
}

var brands = [new Stock('Todas as Marcas')];
var categories = [new Stock('Todas as Categorias')];
var colors = [new Stock('Todas as Cores')];
var genders = [new Stock('Todas os Gêneros')];

function onSearchCallBack(data) {
  for (var i = 0; i < data.length; i++) {
    var product = data[i];

    capture(product, brands, 'brand');
    capture(product, categories, 'category');
    capture(product, colors, 'color');
    capture(product, genders, 'gender');
  }

  print(genders, '#stock-gender');
  print(brands, '#stock-brand');
  print(categories, '#stock-category');
  print(colors, '#stock-color');
}


function capture(product, list, field) {
  var current = new Stock();
  var value = product[field];

  if (list[value]) {
    current = list[value];
  }

  current.value = value;
  current.field = field;
  current.total += product.quantity;
  current.refs++;

  list[value] = current;

  //Suming
  list[0].total += product.quantity;
  list[0].refs++;
}



function print(list, holder) {
  var ordered = [];

  Object.keys(list).forEach(function(key, index) {
    ordered.push(list[key]);
  });

  ordered.sort(function(a, b) {
    return a.total > b.total ? -1 : a.total < b.total ? 1 : 0;
  });

  for (var i = 0; i < ordered.length; i++) {
    createLabel(holder, ordered, i);
  }
}

function createLabel(holder, list, index) {
  var stockItem = list[index];

  var bgColor = stockItem.field === 'color' ? Util.colorVal(stockItem.value) : Util.strToColor(stockItem.value);
  var fontColor = tinycolor(bgColor).getBrightness() > 200 ? '#403e3e' : '#f';

  var div = $('<div>')
    .attr('field', stockItem.field)
    .attr('value', stockItem.value)
    .css('color', fontColor).addClass('label div-label');


  if (index == 0) {
    div.css('background-color', '#7d7d7d');
    var count = $('<strong>').addClass('info lable-unit pull-right').text(list.length);
    div.append(count);
  } else {
    div.css('background-color', bgColor).click(function() {
      var field = $(this).attr('field');
      var value = $(this).attr('value');

      var bundle = {};
      bundle[field] = value;

      Keep.searchAttrs(bundle);
      Keep.lastProductSearch('');
      $('#choose-product-menu-item').click();
    });
  }

  var label = $('<strong>').addClass('lable-unit').text(Util.short(stockItem.value, 25));
  var refs = $('<strong>').addClass('info lable-unit pull-right').text(stockItem.refs);
  var total = $('<strong>').addClass('info lable-unit pull-right').text(stockItem.total);

  div.append(label, refs, total);

  $(holder).append(div);
}



function storeKeepValues() {

}

function restoreKeepValues() {

}