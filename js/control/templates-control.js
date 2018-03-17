var Emoji = require(_jsdir + 'less/emoji.js');
var MongoDb = require(_jsdir + 'mongoose/MongoDb.js');

$(document).ready(function() {

  new ListBuilder('desc').addVars(['{.brand}', '{.color}', '{.category}', '{.gender}', '{.price}']).build();
  new ListBuilder('link').addVars(['{.link}']).build();
  new ListBuilder('hashtag').addVars(['{.category}', '{.brand}']).build();

  restoreKeepValues();
});



var ListBuilder = class ListBuilder {

  constructor(name) {
    this.name = name;
    this.input = $('#' + name);
    this.list = $('#' + name + '-list');
    this.save = $('#' + name + '-save');
    this.varsMenu = $('#' + name + '-vars');
    this.varBt = $('#' + name + '-vars-bt');
  }

  addVars(arr) {
    this.vars = arr;

    return this;
  }

  build() {
    Emoji.build(this.input);

    this.showListLoading();
    this.spawVarsOptions();

    var _self = this;

    this.varBt.click(function() {
      _self.varsMenu.toggle();
    });

    TemplatesMDb.find({
      type: this.name
    }).sort({
      field: 'asc',
      _id: 1
    }).exec(function(err, docs) {
      _self.renderItens(docs);
      _self.hideListLoading();
    });

    this.save.click({
      _self: _self
    }, function() {

      var object = {
        item: _self.input.val(),
        type: _self.name
      };

      Emoji.clear(_self.input);

      var id = _self.save.attr('editing');



      if (id != 0 && id != undefined) {

        _self.applyEditing();
        $("div[id='" + id + "']").find(".description-body").text(object.item);

        TemplatesMDb.update({
            _id: id
          },
          object,
          function(err, doc) {
            if (err)
              console.log(err);
          });
      } else {
        _self.applyEditing();

        TemplatesMDb(object).save(function(err, doc) {
          _self.addItemList(doc.id, doc.item);
        });
      }
    });
  }


  showListLoading() {
    var i = $('<i>').addClass('notched circle loading icon');
    var l = $('<label>').text('Loading');
    var div = $('<div>').addClass('loading').append(i, l);

    this.list.append(div);
  }

  renderItens(docs) {
    for (var i = 0; i < docs.length; i++) {
      this.addItemList(docs[i].id, docs[i].item);
    }
  }

  addItemList(id, value) {
    var _self = this;

    var p = $('<p>').addClass('description-body').append(value);
    var content = $('<div>').addClass('content').append(p);

    var del = $('<i>').addClass('remove grey icon pull-right del')
      .click(function() {
        TemplatesMDb.find({
          _id: id
        }).remove(function() {});

        $(this).parent().fadeOut(200, function() {
          $(this).remove();
        });
      });

    var item = $('<div>').addClass('item').append(content, del)
      .hide();

    item.attr('id', id);

    content.click(function() {
      Emoji.text(_self.input, $(this).text());
      _self.applyEditing(id);

      $(this).parent().fadeOut(10).fadeIn().addClass('isEditing');
      return true;
    });

    this.list.prepend(item);
    item.fadeIn('slow');
  }

  applyEditing(id) {
    this.save.attr('editing', id ? id : 0);

    $('.isEditing').removeClass('isEditing');
  }

  hideListLoading() {
    $('#' + this.list.attr('id') + '>.loading').remove();
  }

  spawVarsOptions() {
    var _self = this;
    if (this.vars) {
      for (var i = 0; i < this.vars.length; i++) {
        var item = $('<div>').addClass('item').append(this.vars[i]);

        item.click(function() {
          console.log(_self.input.val());
          Emoji.text(_self.input, _self.input.val() + $(this).text());
        });

        this.varsMenu.append(item);
      }
    }
  }
};





function storeKeepValues() {

}

function restoreKeepValues() {

}