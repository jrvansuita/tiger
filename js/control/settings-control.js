var msg = require(_jsdir + 'util/msg.js');
var Keep = require(_jsdir +'prefs/Keep.js');
var FacebookPage = require(_jsdir +'bean/FacebookPage.js');

$(document).ready(function(){
  $('#products').click(function(){
    require(_jsdir + 'provider/ProductsProvider.js').updateAll();
  });

  $('#templates').click(function(){
    msg.loading();
  });

  $('#nothing').click(function(){
    msg.finished();
  });


  restoreKeepValues();
});

function storeKeepValues(){
  Keep.facebookToken(FacebookPage.test().pageId, $('#t-token').val());
  Keep.facebookToken(FacebookPage.boutique().pageId, $('#bi-token').val());
}

function restoreKeepValues(){
  $('#t-token').val(Keep.facebookToken(FacebookPage.test().pageId));
  $('#bi-token').val(Keep.facebookToken(FacebookPage.boutique().pageId));
}
