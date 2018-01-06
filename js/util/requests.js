module.exports={

  getXml : function(url, onSuccess, onError){
    $.ajax({
      type: "get",
      url: url,
      dataType: "xml",
      success: function(data){
        onSuccess(data);
      },
      error: function(xhr, status) {
        console.log('Error: ' + xhr);
        onError(xhr);
      }
    });
  }

};
