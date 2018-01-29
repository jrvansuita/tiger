const msg = require(_jsdir + 'util/msg.js');
const cnt = require(_jsdir + 'res/cnt.js');
const FB = require('fb');
const db = require(_jsdir + 'db/DataBase.js');

var post;


module.exports = {

  postOnFacebook: function(postObject) {
    //Não adiantou clonar, as functions dos items não são mantidas...
    //post = Object.assign(Object.create( Object.getPrototypeOf(postObject)), postObject);
    post = postObject;

    msg.loading();

    FB.setAccessToken(Keep.facebookToken());

    if (needNewToken()) {
      exchangeTokens(function(newToken) {
        //Save new token
        Keep.facebookToken(newToken);

        FB.setAccessToken(newToken);
        doPost();
      });
    } else {
      doPost();
    }
  }
};

function doPost() {
  post.assertItemsFacebook();

  post.getItems().forEach(function(item, order) {
    //Keep the order that user selected
    //The upload here is not resulting on correct order
    item.order = order;

    uploadImage(item, function(res, index) {
      if (notError(res, 'Upload')) {
        post.addAttachedMedia(res.id, index);

        if (post.hasIdMediasForAll()) {

          createPost();
        }
      } else {
        return;
      }
    });

  });
}

function uploadImage(item, callback) {
  FB.api(Keep.facebookPageId() + '/photos', 'post', item, function(res) {
    if (callback) {
      callback(res, item.order);
    }
  });
}

function createPost() {
  post.assertFacebook();

  FB.api(Keep.facebookPageId() + '/feed', 'post', post, function(res) {
    if (notError(res, 'Post')) {

      if (post.unpublished_content_type == undefined) {
        msg.sucess(cnt.published_to_facebook);
      } else {
        msg.sucess(cnt.scheduled_on_facebook);
      }

      db.posts().insert(post);
    }
  });
}

function needNewToken() {
  var last = Keep.lastExchangeFacebookToken();
  var now = new Date().getTime();
  var hours = 2;

  //Compare days between today and the last time we exchanged the token
  var need = Math.round(now - last) >= hours * 36e5;

  if (need) {
    Keep.lastExchangeFacebookToken(now);
  }
  return need;
}

function exchangeTokens(callback) {
  FB.api('oauth/access_token', {
    client_id: Keep.tigerClientId(),
    /* Tiger App ID */
    client_secret: Keep.tigerClientSecret(),
    /* Tiger App Secret */
    grant_type: 'fb_exchange_token',
    fb_exchange_token: FB.getAccessToken()
  }, function(res) {
    if (notError(res, 'Token')) {
      var accessToken = res.access_token;
      var expires = res.expires ? res.expires : 0;
      callback(accessToken, expires);
    }
  });
}

function notError(e, tag) {


  if (e.error) {

    var message = e.error.message;

    if (e.error.message.contains('invalid image file')) {
      message = cnt.link_broken;
    }

    msg.error((tag ? tag + ': ' : '') + message);
    return false;
  }

  return true;
}