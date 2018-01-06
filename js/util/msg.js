const cnt = require(_jsdir + 'res/cnt.js');

module.exports = {
  clear : function(msg){
    show('');
  },

  loading : function(msg){
    show(msg ? msg : cnt.loading, null, null, true, false);
  },

  finished : function(msg){
    this.sucess(cnt.finished);
  },

  sucess : function(msg){
    show(msg, 'circle', '#34c84a');
  },

  warn : function(msg){
    show(msg, 'circle', '#fdbc40');
  },

  error : function(msg){
    show(msg, 'circle', '#fc605b');
  },

  show : function(msg){
    show(msg);
  }
};

function show(msg, iconClass, color, showLoader, dismiss) {
  console.log(msg);
  $('#hint-message').text(msg);

  $('#icon-message').removeClass();
  $('#icon-message').toggle(iconClass ? true: false)
  .addClass('icon pull-right ' + iconClass).css('color', color);

  $('#loader-message').toggle(showLoader ? true: false);

  if (dismiss || (dismiss === undefined)){
    $('#message-holder').stop().fadeIn(0).delay(5000).fadeOut('slow');
  }else{
    $('#message-holder').show();
  }


}
