// const cookie = require(_jsdir + 'provider/CookiesProvider.js');
var Keep = require(_jsdir + 'prefs/Keep.js');

function bindMenu() {
  $('.nav-group-item').click(function() {
    msg.clear();

    if (!$(this).hasClass('active')) {
      var page = $(this).attr('page');

      $(".nav-group-item.active").removeClass('active');

      if (typeof storeKeepValues === "function") {
        storeKeepValues();
      }

      $("#pane-content").empty();

      $(this).addClass('active');
      $("#pane-content").load(page);

      Keep.currentPage(this.id);
    }
  });

  var last = Keep.currentPage();

  if (last) {
    $('#' + last).click();
  } else {
    $('.nav-group-item')[0].click();
  }
}

module.exports = {
  showChooseProducts: function() {
    $('#choose-product-menu-item').click();
  },

  showPublish: function() {
    $('#publish-menu-item').click();
  }
};