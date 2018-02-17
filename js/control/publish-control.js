/* -- Imports -- */

var provider = require(_jsdir + 'provider/ProductsProvider.js');

var adapter = require(_jsdir + 'adapter/PublishPostAdapter.js');
var short = require(_jsdir + 'util/short-url.js');
var Emoji = require(_jsdir + 'less/emoji.js');
var Calendar = require(_jsdir + 'less/calendar.js');
var MultiSelect = require(_jsdir + 'less/multiselect.js');
var FaceApi = require(_jsdir + 'fb/FaceApi.js');
var InstApi = require(_jsdir + 'insta/InstApi.js');


/* -- Variables -- */

var products;

/* -- Ready -- */

$(document).ready(function() {
  //Find products from selected array
  provider.findSkus(Keep.selectedProducts(), function(data) {
    products = data;

    adapter.init(products, function() {
      buildTriggers();

      adapter.select(products[0].sku);
      restoreKeepValues();

      $('#description-loading-holder').fadeOut(200);
    });

    adapter.buildGallery();
    loadProfileInfo();
  });
});


function buildTriggers() {

  MultiSelect.build($('#select-hashtags:parent'),
    function(addedValue) {
      adapter.addHashtag(addedValue.replace(/\s/g, ''));
    },
    function(removedValue) {
      adapter.removeHashtag(removedValue);
    });

  $('#facebook-post').click(function() {
    if (isLinkOk() && consistItemsCount(adapter.getItemsCount(), 4)) {
      adapter.facePost();
    }
  });

  $('#instagram-post').click(function() {
    if (isLinkOk() && consistItemsCount(adapter.getItemsCount(), 10)) {
      if ($('#schedule-val').val() !== '') {
        $('#schedule-warn').text(cnt.cant_schedule_on_instagram).fadeIn();
      } else {
        $('#schedule-warn').fadeOut();
        adapter.instaPost();
      }
    }
  });

  $('#regenerate').click(function() {
    adapter.setNewSugested();
  });

  Emoji.build($('#link-holder'));
  Emoji.onInput($('#link-holder'), function() {
    onDescriptionChanged();
  });

  Emoji.build($('#description'));
  Emoji.onInput($('#description'), function() {
    onDescriptionChanged();
  });

  Calendar.onChange($('#schedule'), function(date) {
    adapter.setScheduleTime(date);
    $('#post-date').text(Util.longDate(date ? date : new Date()));
  });

  $('#url, #source, #medium, #name').on('input', function() {
    onBuyLinkChanged();

    onDoShortLink(false);
  });

  $('#token').click(function() {
    adapter.testeToken();
  });

  $('#check-in').click(function() {
    $(this).toggleClass('active');

    var checkIn = $(this).hasClass('active');

    adapter.setCheckIn(checkIn);
  });

  $('#short-url').click(function() {
    onDoShortLink(!$(this).hasClass('active'));
  });

  $('.img-item').click(function() {
    if (!$(this).hasClass('selected')) {
      adapter.select($(this).attr('data-id'));
    }
  });

  $('#same-link, #same-description').click(function() {
    adapter.toggleSame($(this).attr('same'));
    $(this).toggleClass('active');
  });

  $('#lab-link').click(function() {
    applyMagicLink();
  });

  $('#future-date').click(function() {
    if ($(this).hasClass('active')) {
      $('#schedule').calendar('clear');
    } else {
      adapter.setFutureDate();
    }

    $(this).toggleClass('active');

  });
}

function isLinkOk() {
  if ($('#url').val().length === 0) {
    msg.error(cnt.link_not_defined);
    return false;
  }

  return true;
}

function applyMagicLink(callback) {
  $('#lab-link').addClass('active');

  adapter.labLink(function(newLink, criteria) {
    $('#url').val(newLink);

    if (criteria.hasSameBrand()) {
      $('#name').val(criteria.getBrands()[0].toLowerCase());
    }


    onBuyLinkChanged();
    onDoShortLink(false);


    if (callback != undefined) {
      callback();
    }
  });
}

function onDoShortLink(doShort) {
  $('#short-url').toggleClass('active', doShort);

  console.log('Passou ' + doShort + ' ' + $('#short-url').hasClass('active'));

  if ($('#url').val()) {
    adapter.handleShortLink(doShort);
  }
}

function loadProfileInfo() {
  InstApi.getProfile(function(profile) {
    $('#profile-loading-holder').remove();

    $('#profile-thumb').attr('src', profile.pic);
    $('#profile-name').text(profile.name);
    $('#post-date').text(Util.longDate(new Date()));
  });
}

function onBuyLinkChanged() {
  if ($('#url').val()) {
    var inputUrl = $('#url')[0];
    inputUrl.value = Util.removeProtocol(inputUrl.value);
    adapter.swapBuyLink();
  }
}

function onDescriptionChanged() {
  adapter.swapDescription();
}

function storeKeepValues() {

  Keep.buyUrl($('#url').val());
  Keep.campaignSource($('#source').val());
  Keep.campaignMedium($('#medium').val());
  Keep.campaignName($('#name').val());
  Keep.shortBuyUrl($('#short-url').hasClass('active'));
  Keep.checkIn($('#check-in').hasClass('active'));
  Keep.magicLink($('#lab-link').hasClass('active'));
  Keep.futureDate($('#future-date').hasClass('active'));
}

function restoreKeepValues() {
  $('#url').val(Keep.buyUrl());
  $('#source').val(Keep.campaignSource());
  $('#medium').val(Keep.campaignMedium());
  $('#name').val(Keep.campaignName());

  if (Keep.magicLink()) {
    applyMagicLink(function() {
      if (Keep.shortBuyUrl()) {
        onDoShortLink(true);
      }
    });
  } else {
    if (Keep.shortBuyUrl()) {
      $('#short-url').click();
    }
  }

  if (Keep.checkIn()) {
    $('#check-in').click();
  }

  if (Keep.futureDate()) {
    $('#future-date').click();
  }
}


function consistItemsCount(count, max) {
  if (count > max) {
    msg.error(cnt.to_many_items);
    return false;
  }

  return true;

}