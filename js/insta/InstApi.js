module.exports = {

  postOnInstagram: function(post) {
    msg.loading();

    createSession(function(session) {
      post.assertInstagram();

      post.getItems().forEach(function(item, i) {
        Util.toBuffer(i, item.product.imageUrl, function(order, url, buffer) {






          post.addMedia(order, buffer);

          if (post.hasMediasForInsta()) {
            post.assertItemInstagram();


            if (post.getMedias().length === 1) {
              uploadSinglePhoto(session, post);
            } else {
              uploadAlbum(session, post);
            }
          }



        });
      });
    });

  },

  getProfile: function(callback) {
    //var url = "https://www.instagram.com/boutique.infantil/?__a=1";
    var url = "https://apinsta.herokuapp.com/u/boutique.infantil";
    $.ajax({
      dataType: "json",
      type: 'GET',
      url: url,
      success: function(data) {
        console.log(data);
        //var user = JSON.parse(data.split("window._sharedData = ")[1].split(";</script>")[0]).entry_data.ProfilePage[0].graphql;
        var profile = {};

        profile.pic = data.graphql.user.profile_pic_url;
        profile.name = data.graphql.user.full_name;

        if (callback) {
          callback(profile);
        }
      }
    });
  }
};

var Client = require('instagram-private-api').V1;

function createSession(callback) {
  var user = Keep.instaUser();
  var pass = Keep.instaPass();
  var cookie = app.getPath('userData') + "/" + user + '_' + new Date().getTime().toString().slice(0, 7) +
    '.json';

  var device = new Client.Device(user);
  var storage = new Client.CookieFileStorage(cookie);

  Client.Session.create(device, storage, user, pass)
    .then(function(session) {
      callback(session);
    });
}


function uploadSinglePhoto(session, post) {
  Client.Upload.photo(session, post.getMedias()[0].data)
    .then(function(upload) {
      return Client.Media.configurePhoto(session, upload.params.uploadId, post.message);
    }).then(function(medium) {
      msg.sucess(cnt.published_to_instagram);
    });
}

function uploadAlbum(session, post) {

  Client.Upload.album(session, post.getMedias())
    .then(function(payload) {

      Client.Media.configureAlbum(session, payload, post.message, post.disabledComments);
    })
    .then(function() {
      msg.sucess(cnt.published_to_instagram);
    });
}