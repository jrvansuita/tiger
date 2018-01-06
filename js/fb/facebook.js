const FacebookPage =  require(_jsdir + 'bean/FacebookPage.js');
const msg = require(_jsdir + 'util/msg.js');
const cnt = require(_jsdir + 'res/cnt.js');
const FB  =  require('fb');
const db = require(_jsdir + 'db/DataBase.js');

var post;

function refreshtoken(){
  var page = post.getPage();

  //Get the current facebook page token from keep
  var token = Keep.facebookToken(page.pageId, undefined);

  console.log('Refresh: ' +  token);
  FB.setAccessToken(token);
}

module.exports = {

  postOnFacebook: function(postObject){
    //Não adiantou clonar, as functions dos items não são mantidas...
    //post = Object.assign(Object.create( Object.getPrototypeOf(postObject)), postObject);
    post = postObject;

    msg.loading();

    refreshtoken();

    if (needNewToken()){
      exchangeTokens(function(newToken){

        console.log("Got new token: " + newToken);
        //Save new token
        Keep.facebookToken(post.getPage().pageId, newToken);

        refreshtoken();
        doPost();
      });
    }else{
      doPost();
    }
  }
};

function doPost(){
  post.assertItemsFacebook();

  post.getItems().forEach(function(item, order){
    //Keep the order that user selected
    //The upload here is not resulting on correct order
    item.order = order;

    uploadImage(item, function(res, index){
      if (notError(res, 'upload')){
        post.addAttachedMedia(res.id, index);

        if (post.hasIdMediasForAll()){
          createPost();
        }
      }else{
        return;
      }
    });

  });
}

function uploadImage(item, callback) {
  FB.api(post.getPage().pageId + '/photos', 'post', item, function (res) {
    if (callback){
      callback(res, item.order);
    }
  });
}

function createPost() {
  post.assertFacebook();

  FB.api(post.getPage().pageId + '/feed', 'post', post, function (res) {
    if (notError(res, 'create post')){
      msg.sucess(cnt.postPublished);

      db.posts().insert(post);
    }
  });
}

function needNewToken(){
  var last = Keep.lastExchangeFacebookToken(post.getPage().pageId);
  var now = new Date().getTime();
  var hours = 2;

  //Compare days between today and the last time we exchanged the token
  var need =  Math.round(now-last) >= hours * 36e5;

  if (need){
    Keep.lastExchangeFacebookToken(post.getPage().pageId, now);
  }


  console.log("Need refresh: " + need);
  return need;
}

function exchangeTokens(callback){
  FB.api('oauth/access_token', {
    client_id: '396005934189478', /* Tiger App ID */
    client_secret: 'a66742f32f2b702708681af73d3a9b74', /* Tiger App Secret */
    grant_type: 'fb_exchange_token',
    fb_exchange_token: FB.getAccessToken()
  }, function (res) {
    if (notError(res,'exchange token')){
      var accessToken = res.access_token;
      var expires = res.expires ? res.expires : 0;
      callback(accessToken, expires);
    }
  });
}

function notError(e, tag) {
  if(e.error) {
    msg.error((tag ? tag + ': ' : '') +  e.error.message);
    return false;
  }

  return true;
}
