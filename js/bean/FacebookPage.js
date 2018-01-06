

class FacebookPage {
  constructor(id, pageId,  accessToken) {
    this.id = id;
    this.pageId = pageId;
  }
}

//Estou usando o Graph Explorer para gerar um accessToken
//Como página da boutique infantil
//https://developers.facebook.com/tools/explorer/
//https://github.com/node-facebook/facebook-node-sdk
module.exports = {
  test : function(){
    return new FacebookPage('1015011101963764', 'testjr');
  },

  boutique : function(){
      return new FacebookPage('1615033445450026', 'lojaboutiqueinfantil');
  },
};
