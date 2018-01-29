var msg = require(_jsdir + 'util/msg.js');
var Keep = require(_jsdir + 'prefs/Keep.js');

$(document).ready(function() {
  $('#products').click(function() {
    require(_jsdir + 'provider/ProductsProvider.js').updateAll();
  });

  $('#templates').click(function() {
    msg.loading();
  });

  $('#nothing').click(function() {
    require(_jsdir + 'insta/InstApi.js').teste();
  });


  restoreKeepValues();
});

function storeKeepValues() {
  Keep.facebookToken($('#fb-token').val());
  Keep.facebookPageName($('#fb-page-name').val());
  Keep.facebookPageId($('#fb-page-id').val());


  Keep.minimumStock($('#minimum-stock').val());
  Keep.tigerClientId($('#tiger-client-id').val());
  Keep.tigerClientSecret($('#tiger-secret').val());

  Keep.instaUser($('#insta-user').val());
  Keep.instaPass($('#insta-pass').val());
}

function restoreKeepValues() {
  $('#fb-token').val(Keep.facebookToken());
  $('#fb-page-id').val(Keep.facebookPageId());
  $('#fb-page-name').val(Keep.facebookPageName());

  $('#minimum-stock').val(Keep.minimumStock());
  $('#tiger-client-id').val(Keep.tigerClientId());
  $('#tiger-secret').val(Keep.tigerClientSecret());

  $('#insta-user').val(Keep.instaUser());
  $('#insta-pass').val(Keep.instaPass());
}