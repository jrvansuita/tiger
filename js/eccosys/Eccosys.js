var MD5 = require(_jsdir + 'util/md5.js');


// ApiKey do Eccosys
var apiKey = 'b37f6a2583f10f369c549333b7c76cdaa4c56801';
// secret da aplicação gerada no Eccosys
var secret = '3986a24a30abc5e54c198444c289bf11f6c1a916';
//Url
var url = "https://boutiqueinfantil.eccosys.com.br/api/";

module.exports = {

  get : function (path, callback){

    $.ajax({
      type: 'GET',
      url: url + path,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'apikey': apiKey,
        'signature': generateSignature(),
      },
      success: function (res) {
        callback(res);
      },
      error : function(e){
        callback(undefined);
      }
    });

    }
  };


  //Generated signature
  var signature;

  function generateSignature() {
    if (signature == undefined){
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();

      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      date = d + '-' + m + '-' + y;

      signature = MD5.get(secret + ":" + date);
    }

    return signature;
  }
