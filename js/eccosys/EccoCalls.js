var Eccosys = require(_jsdir + 'eccosys/Eccosys.js');


module.exports = {

  getClient : function (id, callback){
    Eccosys.get('clientes/' + id, callback);

  }
};
