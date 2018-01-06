
/* -- Imports -- */

var provider = require(_jsdir + 'provider/ProductsProvider.js');
var Facebook =  require(_jsdir + 'fb/facebook.js');
var Insta = require(_jsdir + 'insta/InstagramProfile.js');
var adapter = require(_jsdir + 'adapter/PublishPostAdapter.js');
var short = require(_jsdir + 'util/short-url.js');
var Emoji = require(_jsdir + 'less/emoji.js');
var Calendar = require(_jsdir + 'less/calendar.js');
var MultiSelect = require(_jsdir + 'less/multiselect.js');
var FacebookPage = require(_jsdir +'bean/FacebookPage.js');

/* -- Variables -- */

var products;

/* -- Ready -- */

$(document).ready(function(){
  //Find products from selected array
  provider.findSkus(Keep.selectedProducts(), function (data) {
    products = data;
    adapter.init(products);
    adapter.buildGallery();

    //onClear();

    buildTriggers();
    loadProfileInfo();

    setTimeout(function(){
      adapter.select(products[0].sku);

      restoreKeepValues();
    },100);
  });
});


function buildTriggers(){

  MultiSelect.build($('#select-hashtags:parent'),
  function(addedValue){
    adapter.addHashtag(addedValue.replace(/\s/g, ''));
  },function(removedValue){
    adapter.removeHashtag(removedValue);
  });

  $('#post-boutique').click(function(){
    adapter.makePost(FacebookPage.boutique());
  });

  $('#post-test').click(function(){
    adapter.makePost(FacebookPage.test());
  });


  $('#regenerate').click(function(){
    adapter.setNewSugested();
  });

  Emoji.build($('#link-holder'));
  Emoji.onInput($('#link-holder'), function(){
    onDescriptionChanged();
  });

  Emoji.build($('#description'));
  Emoji.onInput($('#description'), function(){
    onDescriptionChanged();
  });

  Calendar.onChange($('#schedule'), function(date){
    adapter.setScheduleTime(date);
    $('#post-date').text(Util.longDate(date ?date : new Date()));
  });

  $('#url, #source, #medium, #name').on('input',function(){
    onBuyLinkChanged();

    onDoShortLink(false);
  });

  $('#token').click(function(){
    adapter.testeToken();
  });

  $('#check-in').click(function(){
    $(this).toggleClass('active');

    var checkIn = $(this).hasClass('active');

    adapter.setCheckIn(checkIn);
  });

  $('#short-url').click(function() {
    onDoShortLink(!$(this).hasClass('active'));
  });

  $('.img-item').click(function(){
    if (!$(this).hasClass('selected')){
      adapter.select($(this).attr('data-id'));
    }
  });

  $('#same-link, #same-description').click(function(){
    adapter.toggleSame($(this).attr('same'));
    $(this).toggleClass('active');
  });

  $('#lab-link').click(function(){
    applyMagicLink();
  });

  $('#future-date').click(function(){
    if ($(this).hasClass('active')){
      $('#schedule').calendar('clear');
    }else{
      adapter.setFutureDate();
    }

    $(this).toggleClass('active');

  });
}

function applyMagicLink(callback){
  $('#lab-link').addClass('active');

  adapter.labLink(function (newLink, brand){
    $('#url').val(newLink);

    if (brand){
      $('#name').val(brand.toLowerCase() );
    }

    onBuyLinkChanged();
    onDoShortLink(false);


    if (callback != undefined){
      callback();
    }
  });
}

function onDoShortLink(doShort){
  $('#short-url').toggleClass('active', doShort);

  if ($('#url').val()){
    adapter.handleShortLink(doShort);
  }
}

function loadProfileInfo(){
  Insta.getData(function(profile){
    $('#profile-thumb').attr('src', profile.pic);
    $('#profile-name').text(profile.name);
    $('.post-info').stop().css('visibility', 'visible').fadeIn(300);
    $('#post-date').text(Util.longDate(new Date()));
  });
}

function onBuyLinkChanged(){
  if ($('#url').val()){
    var inputUrl = $('#url')[0];
    inputUrl.value = Util.removeProtocol(inputUrl.value);
    adapter.swapBuyLink();
  }
}

function onDescriptionChanged(){
  adapter.swapDescription();
}

function storeKeepValues(){

  Keep.buyUrl($('#url').val());
  Keep.campaignSource($('#source').val());
  Keep.campaignMedium($('#medium').val());
  Keep.campaignName($('#name').val());
  Keep.shortBuyUrl($('#short-url').hasClass('active'));
  Keep.checkIn($('#check-in').hasClass('active'));
  Keep.magicLink($('#lab-link').hasClass('active'));
  Keep.futureDate($('#future-date').hasClass('active'));
}

function restoreKeepValues(){
  $('#url').val(Keep.buyUrl());
  $('#source').val(Keep.campaignSource());
  $('#medium').val(Keep.campaignMedium());
  $('#name').val(Keep.campaignName());

  onBuyLinkChanged();

  if (Keep.magicLink()){
    applyMagicLink(function(){
      if (Keep.shortBuyUrl()){
        $('#short-url').click();
      }
    });
  }else{
    if (Keep.shortBuyUrl()){
      $('#short-url').click();
    }
  }

  if (Keep.checkIn()){
    $('#check-in').click();
  }

  if (Keep.futureDate()){
    $('#future-date').click();
  }
}
