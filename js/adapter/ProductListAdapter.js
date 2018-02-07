const productsProvider = require(_jsdir + 'provider/ProductsProvider.js');
const util = require(_jsdir + 'util/utils.js');
const cnt = require(_jsdir + 'res/cnt.js');
var tinycolor = require('tinycolor2');
var Keep = require(_jsdir + 'prefs/Keep.js');

module.exports = {
  init: function() {
    productsProvider.init();
    recoverSelectedAttrs();
  },

  hasSearchAttrs: function() {
    return productsProvider.hasAttrs();
  },

  selectAll(check) {
    for (var i = 0; i < list.length; i++) {
      if (i < loadedIndexes) {
        toggleChecked(i, check);
      }
    }
  },

  toggleAll() {
    for (var i = 0; i < list.length; i++) {
      if (i < loadedIndexes) {
        toggleChecked(i);
      }
    }
  },

  execute: function(searchText, onFinished) {
    productsProvider.setSearchCallBack(function(data) {
      onFinishedSearch(data);
      onFinished();
    });

    productsProvider.search(searchText);
  },

  saveSelecteds() {
    var skus = [];
    var $el = $('.checked');

    for (var i = 0; i < $el.length; i++) {
      skus.push($($el[i]).attr('sku'));
    }

    Keep.selectedProducts(skus);

    return skus.length > 0;
  },

};

var list = [];
var loadedIndexes = 0;
var threshold = 50;

function onFinishedSearch(data) {
  list = data;

  $('.list-group-item').remove();
  loadedIndexes = 0;

  var $pane = $('#pane-content');
  var $list = $('#feed-list');

  $pane.unbind('scroll').bind('scroll', function() {
    if (($pane.scrollTop() + $pane.height()) + 1000 >= $list.height()) {
      loadMore();
    }
  });

  loadMore();
}

function loadMore() {
  if (loadedIndexes < list.length) {
    var max = loadedIndexes + threshold;
    max = max > list.length ? list.length : max;

    for (var i = loadedIndexes; i < max; i++) {
      appendItem(i, list[i]);
    }

    loadedIndexes += threshold;
  }
}

/* Internal Functions */

function appendItem(index, item) {
  var left = createLeft(index, item);
  var main = createMain(item);
  var right = createRight(item);

  var li = $('<li>').append(left, main, right)
    .attr('id', 'item-' + index)
    .attr('sku', item.sku)
    .addClass('list-group-item');

  $('#feed-list').append(li);
}

function createLeft(index, item) {
  var checkBoxId = 'check-' + index;

  var checked = $('<input>', {
    type: 'checkbox',
  }).attr('id', checkBoxId).css('display', 'none');

  var img = $('<img>')
    .attr('src', item.imageUrl)
    .addClass('thumb')
    .hover(function() {
        zoomImg(this, item.imageUrl);
      },
      function() {
        zoomImg();
      });



  var label = $('<label>')
    .attr('for', checkBoxId)
    .append(img);


  return $('<div>').append(checked, label)
    .addClass('media-object pull-left')
    .click({
      index: index,
    }, function(event) {
      toggleChecked(event.data.index);
      return false;
    });
}

function createMain(item) {
  var title = createTitle(item);
  var description = createDescription(item);
  var media = $('<div>').addClass('media-body ').append(title, description);
  return media;
}

function createRight(item) {
  var firstRow = $('<p>').addClass('label-row')
    .append(createLabel(item.brand, item.brand, 'brand'),
      createLabel(item.color, item.color, 'color'));

  var secondRow = $('<p>').addClass('label-row')
    .append(createLabel(item.price, util.money(item.price), 'price'),
      createLabel(item.quantity, util.und(item.quantity), 'quantity'));

  var thirdRow = $('<p>').addClass('label-row')
    .append(createLabel(item.gender, item.gender, 'gender'),
      createLabel(item.category, item.category, 'category'));

  var media = $('<div>').addClass('media-body left-divider right-body')
    .append(firstRow, secondRow, thirdRow);

  return media;
}

function createLabel(value, text, field, removeSelf) {
  var bgColor = field == 'color' ? util.colorVal(text) : util.strToColor(text);
  var fontColor = tinycolor(bgColor).getBrightness() > 200 ? '#403e3e' : '#f';

  var label = $('<strong>').text(text)
    .addClass('label')
    .attr('field', field)
    .attr('value', value)
    .css('background-color', bgColor)
    .css('color', fontColor);

  if (removeSelf) {
    label.click(function() {
      $(this).remove();
      productsProvider.searchAttr(field, value);
    });
  } else {
    label.click(function() {
      var field = $(this).attr('field');

      if ($('div#label-box > strong[field=' + field + ']').length == 0) {
        var value = $(this).attr('value');
        value = util.isNumbers(value) ? parseInt(value) : value;
        productsProvider.searchAttr(field, value);

        $('#label-box').append(createLabel(value, text, field, true));
      }
    });
  }

  return label;
}

function createTitle(item) {
  var $title = $('<strong>').addClass('title')
    .html(createLink(' ' + item.title, item.url)
      .prop('outerHTML'));

  var sku = $('<strong>').text(item.sku).addClass('label copiable sku')
    .click(function() {
      Util.selectContent(this);
      Util.copySeleted();
    });

  var div = $('<div>').css('line-height', '30px').append(sku, $title);

  return div;
}

function createDescription(item) {
  return $('<p>').addClass('description-body').text(item.description);
}

function toggleChecked(index, check) {
  var $item = $('#item-' + index);
  var $glyph = $('#check-' + index);

  if (check === undefined) {
    $item.toggleClass('checked');
    $glyph.attr('checked', !$glyph.attr('checked'));
  } else {
    $item.toggleClass('checked', check);
    $glyph.attr('checked', check);
  }
}

function createLink(label, url) {
  return $('<a>').addClass('open-in-browser').attr('href', url).html(label);
}

function recoverSelectedAttrs() {
  var attrs = Keep.searchAttrs();

  Object.keys(attrs).forEach(function(key, index) {
    var value = attrs[key];
    $('#label-box').append(createLabel(value, value, key, true));
  });
}


var runLatter;

function zoomImg(element, src) {
  if (src) {
    var runnable = function(element, src) {
      var offset = $(element).offset();

      offset.left += 150;
      var minTop = 60;
      var maxTop = 340;
      offset.top = (offset.top - minTop) < minTop ? minTop : offset.top - minTop;
      offset.top = offset.top > maxTop ? maxTop : offset.top;

      var $img = $('<img>')
        .addClass('thumb zoom-img')
        .offset(offset)
        .hide()
        .attr('src', src)
        .fadeIn();

      $('.window').append($img);
    };

    runLatter = setTimeout(function() {
      runnable(element, src);
    }, 1000);

  } else {
    clearTimeout(runLatter);
    $('.zoom-img').fadeOut(200, function() {
      $(this).remove();
    });
  }
}