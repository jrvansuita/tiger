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
              uploadSinglePhoto(session, post.getMedias()[0].data, post.message);
            } else {
              uploadAlbum(session, post);
            }
          }
        });
      });
    });

  },

  getProfile: function(callback) {
    var url = 'https://www.instagram.com/boutique.infantil/?__a=1';
    $.ajax({
      dataType: "json",
      url: url,
      success: function(data) {
        var profile = {};
        profile.pic = data.user.profile_pic_url;
        profile.name = data.user.full_name;

        if (callback) {
          callback(profile);
        }
      }
    });
  }
};

var Client = require('instagram-private-api').V1;

function createSession(callback) {
  var device = new Client.Device(Keep.instaUser());
  var storage = new Client.CookieFileStorage(app.getPath('userData') + "/" + Keep.instaUser() + '.json');

  Client.Session.create(device, storage, Keep.instaUser(), Keep.instaPass())
    .then(function(session) {
      callback(session);
    });
}


function uploadSinglePhoto(session, photo, message) {
  Client.Upload.photo(session, photo)
    .then(function(upload) {
      //console.log(upload.params.uploadId);
      return Client.Media.configurePhoto(session, upload.params.uploadId, message);
    })
    .then(function(medium) {
      msg.sucess(cnt.published_to_instagram);
    });
}

function uploadAlbum(session, post) {
  Client.Upload.album(session, post.getMedias())
    .then(function(payload) {
      console.log(payload);

      Client.Media.configureAlbum(session, payload, post.message, post.disabledComments);
    })
    .then(function() {
      msg.sucess(cnt.published_to_instagram);
    });
}