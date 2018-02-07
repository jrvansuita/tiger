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






function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var lastPosition = 0;

module.exports = {
  autoPost: function() {
    lastPosition = 0;
    run();
  }
};

function checkMenu(callback) {
  if (!$('a.nav-group-item.active').attr('page').contains('choose')) {
    $('#choose-product-menu-item').click();
    sleep(1000).then(() => {
      callback();
    });
  } else {
    callback();
  }
}

function run() {

  checkMenu(function() {
    if (isSearching()) {
      msg.clear();

      prepareList();

      if (gotProducts()) {
        publishClick(function() {
          run();
        });
      } else {
        msg.sucess(cnt.completed);
      }
    }
  });
}


function isSearching() {
  var nope = $('#search').val() === "" && $('#label-box').children().length == 0;

  if (nope) {
    msg.error(cnt.emptySearch);
    return false;
  }

  return true;
}


function prepareList() {
  //Dischecked any checked
  $('input:checkbox:checked').parent().click();


}

function gotProducts() {
  var postLength = 4;

  for (var i = 0; i < postLength; i++) {
    var id = '#check-' + (lastPosition + i);

    $(id).parent().click();

    $('#pane-content').scrollTop(120 * lastPosition);
  }

  lastPosition += postLength;

  var selected = $('input:checkbox:checked').length > 1;

  if (!selected) {
    $('input:checkbox:checked').click();
  }

  return selected;
}

function publishClick(sucess) {
  sleep(1000).then(() => {
    $('#publish').click();

    preparePost(sucess);
  });
}

function preparePost(sucess) {
  sleep(1000).then(() => {
    if (!$('#future-date').hasClass('active')) {
      $('#future-date').click();
    }

    if (!$('#check-in').hasClass('active')) {
      $('#check-in').click();
    }

    if (!$('#lab-link').hasClass('active')) {
      $('#lab-link').click();
    }

    sleep(200).then(() => {
      if (!$('#short-url').hasClass('active')) {
        $('#short-url').click();
      }

      sleep(1000).then(() => {
        $('#facebook-post').click();
        sleep(8000).then(() => {
          sucess();
        });
      });
    });
  });
}