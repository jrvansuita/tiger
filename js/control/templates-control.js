var Emoji = require(_jsdir + 'less/emoji.js');
var MongoDb = require(_jsdir + 'mongoose/MongoDb.js');

$(document).ready(function() {

  prepareList('desc');
  prepareList('link');
  prepareList('hashtag');

  restoreKeepValues();
});

function prepareList(valName) {
  var listName = valName + '-list';
  var saveName = valName + '-save';

  Emoji.build($('#' + valName));

  showListLoading(listName);
  TemplatesMDb.find({
    type: valName
  }, function(err, docs) {
    renderItens(listName, docs);
    hideListLoading(listName);
  });

  $('#' + saveName).click(function() {
    TemplatesMDb({
      item: $('#' + valName).val(),
      type: valName
    }).save(function(err) {
      if (err) console.log(err);
    });

    addItemList(listName, $('#' + valName).val());
    Emoji.clear($('#' + valName));
  });
}

function showListLoading(listName) {
  var i = $('<i>').addClass('notched circle loading icon');
  var l = $('<label>').text('Loading');
  var div = $('<div>').addClass('loading').append(i, l);

  $('#' + listName).append(div);
}

function hideListLoading(listName) {
  $('#' + listName + '>.loading').remove();
}

function renderItens(listName, docs) {
  docs.forEach(function(doc) {
    addItemList(listName, doc.item);
  });
}

function addItemList(listName, value) {
  var p = $('<p>').addClass('description-body').append(value);
  var content = $('<div>').addClass('content').append(p);
  var del = $('<i>').addClass('remove grey icon pull-right del').click(function() {

    TemplatesMDb.find({
      item: value
    }).remove(function() {});

    $(this).parent().fadeOut(200, function() {
      $(this).remove();
    });
  });

  var item = $('<div>').addClass('item').append(content, del).hide();

  $('#' + listName).prepend(item);
  item.fadeIn('slow');
}

function storeKeepValues() {

}

function restoreKeepValues() {

}