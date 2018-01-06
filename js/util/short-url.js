module.exports = {

//Fonte
//https://console.developers.google.com/apis/credentials?project=tiger-186923

  get : function (longUrl, callback) {
    var googleSecret = 'AIzaSyAxiQAeEckzlpR-nciHvFQLiiLeOWyUo7Y';
    var googleUrl = 'https://www.googleapis.com/urlshortener/v1/url?key=';

    $.ajax({
      url: googleUrl + googleSecret,
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: '{ longUrl: "' + longUrl + '"}',
      dataType: 'json',
      success: function(response) {
        callback(response.id);
      }
    });
  }
};
