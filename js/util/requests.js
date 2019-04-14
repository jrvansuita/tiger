module.exports={

  getXml : function(url, onSuccess, onError){
    $.ajax({
      type: "get",
      url: url,
      cache: false,
      dataType: "xml",
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      success: function(data){
        onSuccess(data);
      },
      error: function(xhr, status) {
        console.log('Error: ' + xhr);
        onError(xhr.toString());
      }
    });
  }

};
