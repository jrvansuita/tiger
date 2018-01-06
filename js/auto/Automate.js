//
// function loadAllList(callback){
//   if(($('#pane-content').scrollTop() + $('#pane-content').height()) < $('#feed-list').height()){
//     $('#pane-content').scrollTop($('#feed-list').height());
//     setTimeout(function(){
//       loadAllList(callback);
//     },200);
//   }else{
//     callback();
//   }
// }






function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var lastPosition = 0;

module.exports = {
  autoPost : function(){
    lastPosition = 0;
    run();
  }
};

function checkMenu(callback){
  if (!$('a.nav-group-item.active').attr('page').contains('choose')){
    $('#choose-product-menu-item').click();
    sleep(1000).then(() => {
      callback();
    });
  }else{
    callback();
  }
}

function run(){
  checkMenu(function(){
    if (isSearching()){
      prepareList();

      if (gotProducts()){
        publishClick(function (){
          run();
        });
      }
    }
  });
}


function isSearching(){
  var nope = $('#search').val() === "" && $('#label-box').children().length == 0;

  if (nope){
    msg.error(cnt.emptySearch);
    return false;
  }

  return true;
}


function prepareList(){
  //Dischecked any checked
  $('input:checkbox:checked').parent().click();


}

function gotProducts(){
  var postLength = 4;

  for (var i = 0; i < postLength; i++){
    var id = '#check-' + (lastPosition + i);

    $(id).parent().delay(200).click();

    $('#pane-content').scrollTop(120 * lastPosition);
  }

  lastPosition+= postLength;

  return $('input:checkbox:checked').length > 1;
}

function publishClick(sucess){
  sleep(1000).then(() => {
    $('#publish').click();

    preparePost(sucess);
  });
}

function preparePost(sucess){
  sleep(1000).then(() => {
    if (!$('#future-date').hasClass('active')){
      $('#future-date').click();
    }

    if (!$('#check-in').hasClass('active')){
      $('#check-in').click();
    }

    if (!$('#lab-link').hasClass('active')){
      $('#lab-link').click();
    }

    sleep(200).then(() => {
      if (!$('#short-url').hasClass('active')){
        $('#short-url').click();
      }

      sleep(1000).then(() => {
        msg.clear();
        msg.sucess('postou');
        $('#post-boutique').click();
        sleep(5000).then(() => {
          sucess();
        });
      });
    });
  });
}
