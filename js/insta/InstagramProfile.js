module.exports = {

  getData: function(callback){
    var url = 'https://www.instagram.com/boutique.infantil/?__a=1';
    $.ajax({
      dataType: "json",
      url: url,
      success: function(data){
        var profile = {};
        profile.pic = data.user.profile_pic_url;
        profile.name = data.user.full_name;

        if (callback){
          callback(profile);
        }
      }
    });
  }

};
