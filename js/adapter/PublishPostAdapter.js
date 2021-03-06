//require(_jsdir + 'db/DataStore.js');
const db = require(_jsdir + 'db/DataBase.js');

var Post = require(_jsdir + 'bean/Post.js');
var PostItem = require(_jsdir + 'bean/PostItem.js');
var Sortable = require('sortablejs');
const Consts = require(_jsdir + 'res/consts.js');
var Emoji = require(_jsdir + 'less/emoji.js');
var MagicLink = require(_jsdir + 'less/magic-link.js');
var GroupAnalysis = require(_jsdir + 'less/group-analysis.js');
var TemplatesProvider = require(_jsdir + 'provider/TemplatesProvider.js');


var post;
var selected = 0;
var criteria;

var same = {
  link: true,
  description: true,
};

function getSelected() {
  return getItems()[selected];
}

function getItems() {
  return post.getItems();
}

module.exports = {
  init: function(products, completed) {
    post = new Post();

    criteria = GroupAnalysis.analyse(products);

    products.forEach(function(product) {
      post.addItem(new PostItem(product));
    });

    TemplatesProvider.find(criteria, function(suggested) {
      getItems().forEach(function(item) {
        item.setSugested(suggested);
      });

      completed();
    });
  },

  getItemsCount: function() {
    return getItems().length;
  },

  setNewSugested() {
    $('#regenerate').addClass('loading');

    TemplatesProvider.find(criteria, function(suggested) {

      if (same.description) {
        getItems().forEach(function(item, index) {
          item.setSugested(suggested);
        });
      } else {
        getSelected().setSugested(suggested);
      }

      updateDescriptionViews();
      updatePost();
      $('#regenerate').removeClass('loading');
    });
  },


  setScheduleTime(date) {
    post.setSchedule(date);
  },

  instaPost: function() {
    post.reorder(Keep.selectedProducts());
    InstApi.postOnInstagram(post);
  },

  facePost: function() {
    post.reorder(Keep.selectedProducts());
    FaceApi.postOnFacebook(post);
  },

  select(sku) {
    getItems().forEach(function(item, index) {
      if (item.product.sku == sku) {
        selected = index;
        return true;
      }
    });

    $('.selected').removeClass('selected');
    $("div[data-id='" + sku + "'] ").addClass('selected');

    updateViews();
    updatePost();
  },

  buildGallery: function() {
    var slider = $('#slider').empty();

    var width = Util.calcGalleryImageSize(slider.width(), getItems().length);

    var _self = this;
    getItems().forEach(function(item, index) {

      var div = $('<div>');

      var img = $('<img>')
        .attr('src', item.product.imageUrl)
        .width(width)
        .height(width);

      var del = $('<i>').addClass('remove icon del-post-item ').click((e) => {
        //Remove from selected products
        Keep.selectedProducts(Keep.selectedProducts().filter(a => a !== item.product.sku));
        //Remove items List
        getItems().splice(index, 1);
        //Remove the item from gallery
        _self.buildGallery();
      });

      div.attr('data-id', item.product.sku)
        .addClass('post-item')
        .append(img, del);

      div.click((e) => {
        if (!div.hasClass('selected')) {
          _self.select(div.attr('data-id'));
        }
      });

      slider.append(div);
    });

    Sortable.create(slider[0], {
      animation: 250,
      forceFallback: true,
      store: {
        get: function(sortable) {
          return Keep.selectedProducts();
        },
        set: function(sortable) {
          Keep.selectedProducts(sortable.toArray());
        },
      },
    });
  },

  toggleSame: function(field) {
    same[field] = !same[field];
  },

  setCheckIn: function(doCheckIn) {
    post.setCheckIn(doCheckIn);
  },


  swapBuyLink: function() {
    if (same.link) {
      getItems().forEach(function(item, index) {
        feedBuyLink(item);
      });
    } else {
      feedBuyLink(getSelected());
    }

    updatePost();
  },

  swapDescription: function() {
    if (same.description) {
      getItems().forEach(function(item, index) {
        feedDescription(item);
      });
    } else {
      feedDescription(getSelected());
    }

    updatePost();
  },

  addHashtag: function(value) {
    updateHashtags(null, value);
  },

  removeHashtag: function(value) {
    updateHashtags(value, null);
  },

  labLink: function(callback) {
    MagicLink.build(criteria, callback);
  },

  handleShortLink: function(doShort) {
    if (doShort) {
      short.get(getSelected().getCampaignBuyLink(), function(shortUrl) {
        setNewShortBuyLink(shortUrl);
      });
    } else {
      setNewShortBuyLink(null);
    }
  },


  setFutureDate: function() {
    db.posts().findOne({}).sort({
      scheduled_publish_time: -1
    }).exec(function(err, doc) {
      applyFutureDate(doc);
    });
  },
};

function applyFutureDate(doc) {
  var date = new Date();

  if (doc) {
    doc.scheduled_publish_time = doc.scheduled_publish_time * 1000;
    date = new Date(doc.scheduled_publish_time);
  }

  $('#schedule').calendar('set date', Calendar.nextGreatPostTime(date), true, true);
}

function setNewShortBuyLink(newBuyLink) {
  if (same.link) {
    getItems().forEach(function(item, index) {
      item.setShortBuyLink(newBuyLink);
    });
  } else {
    getSelected().setShortBuyLink(newBuyLink);
  }

  updatePost();
}

function feedBuyLink(item) {
  item.setBuyLink($('#url').val(), $('#source').val(), $('#medium').val(), $('#name').val());
}


function feedDescription(item) {
  item.setPatternsDescription(Emoji.text($('#description')));
  item.setPatternBuyLink(Emoji.text($('#link-holder')));
}

function updateViews() {
  updateDescriptionViews();
  updateLinkViews();
}

function updateDescriptionViews() {
  var item = getSelected();

  Emoji.text($('#description'), item.getPatternDescription());
  Emoji.text($('#link-holder'), item.getPatternBuyLink());

  $('#category').val(item.product.category);
  $('#price').val(item.product.price);

  $('#select-hashtags:parent').dropdown('set exactly', item.getHashTagsArray());
}

function updateLinkViews() {
  var item = getSelected();

  $('#url').val(item.getBuyLink());
  $('#source').val(item.getCampaignSource());
  $('#medium').val(item.getCampaignMedium());
  $('#name').val(item.getCampaignName());

  $('#short-url').toggleClass('active', item.getShortBuyLink() != null);
}

function updatePost() {
  var item = getSelected();

  $('#main-description').empty();

  let desc = $('<p>').text(item.getBuildedDescription());

  var url = item.getCampaignBuyLink();
  url = url ? url : '{buy-link}';

  var a = $('<a>').attr('id', 'buy-link').addClass('open-in-browser').attr('href', url).text(url);
  var buyLink = $('<p>').html(item.getBuildedBuyLink().replace(url, [a.prop('outerHTML')]));
  var hashtags = $('<p>').addClass('hashtags').text(item.getHashTags());

  $('#main-description').append(desc, buyLink, hashtags);
}

function updateHashtags(remove, add) {
  if (getSelected().getHashTags().indexOf(add) == -1) {
    if (same.description) {
      getItems().forEach(function(item, index) {
        setNewHashtagItem(item, remove, add);
      });
    } else {
      setNewHashtagItem(getSelected(), remove, add);
    }
    updatePost();
  }
}

function setNewHashtagItem(item, remove, add) {
  if (remove != undefined) {
    item.setHashTags(item.getHashTags().replace('#' + remove, '').trim());
  }

  if (add != undefined) {
    item.setHashTags(item.getHashTags() + ' #' + add);
  }
}