var EccoCalls = require(_jsdir + 'eccosys/EccoCalls.js');
var Util = require(_jsdir + 'util/utils.js');

var url = 'https://newsurvey.ebit.com.br/Survey/Open/73401?';
var builded = '';

var client;


$(document).ready(function(){

  $('#run').click(function(){
    getClient(function (c) {
      client = c;
      onBuildUrl();
      loadProfile();

      $('#ebit-page').load(builded, function() {

        fillForm();

      });
    });

  });

});

function getClient(callback) {
  console.log('Requesting Client: ' + id);

  var id = genClientId();

  EccoCalls.getClient(id, function(c) {
    if (c && c.length > 0){
      callback(c[0]);
    }else{
      getClient(callback);
    }
  });
}

function genClientId() {
  return Util.rand(73999,70184);
}


function loadProfile() {
  $('#profile').show();
  $('#profile-name').remove();
  $("<span id='profile-name'>" + client.nome + "</span>").insertBefore("#profile-email");
  $('#profile-img').attr('src',getProfileImg());
  $('#profile-email').text(client.email);

}

function onBuildUrl() {
  console.log(client);

  var quantity = Util.rand(50,1);
  var value = quantity * Util.randFloat(30,4);

  builded = url;
  put('email', client.email);
  put('gender', client.sexo == 'feminino' ? 'F' : 'M' );
  put('birthDay', fmtRandomDate());
  put('zipCode', client.cep);
  put('deliveryTax', Util.randFloat(20,2));
  put('deliveryTime', Util.rand(10,2));
  put('value', value);
  put('totalSpent', value);
  put('quantity', quantity);
  put('mktSaleID', 0);
  put('parcels', Util.rand(10,1));
  put('paymentType', 5); //(Cartão de Crédito),
  put('transactionId', rand(8));
  put('storeId', 73401);
  put('buscapeId', 1150839);
  put('lightbox', 'true');
  put('utm_source', 'checkoutloja');
  put('utm_medium', 'lightboxlojas');
  put('utm_campaign', 'respondapesquisa');

  console.log(builded);
}

function put(tag, val) {
  builded += tag + '=' + val + '&amp';
}

function fmtRandomDate() {
  var date = Util.randomDate(new Date(1984, 0, 1), new Date(2001, 1, 1));

  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();

  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  return  d + '-' + m + '-' + y;
}

function rand(length, current) {
  current = current ? current : '';
  return length ? rand(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
}


function getProfileImg() {
  var arr = ['ade','christian','elliot','jenny','joe','nan','stevie','veronika','zoe'];
  return 'assets/people/' + arr[Util.rand(arr.length)] + '.jpg';
}
// productName=Vestido Bebê Âncoras e Laço Cinza - Club B&amp;
// sku=CB159ci-3&amp;


function fillForm() {

  //Essa é a sua 1ª compra na internet?
  fillRadio('STAQuestion-22');

  //Como você chegou nessa loja?
  fillSelect('STAQuestion-1');
  //Qual Rede Social?
  fillSelect('STAQuestion-10312');

  //Qual Portal?
  fillSelect('STAQuestion-10313');

  //Qual o prazo de entrega informado pela loja ?
  fillSelect('AnsweredSurvey_UserDeliveryTimeId');

  //Qual foi o principal motivo da compra?
  fillSelect('STAQuestion-148');

  //Do(s) produto(s) comprado(s), algum foi de loja parceira?
  fillSelect('STAQuestion-10314');

  fillRadio('AnsweredSurvey_HasDeliveryTax');
}

function fillRadio(id) {
  $('input:radio[name='+id+']').prop('checked', true);
}

function fillSelect(id) {
  //Como você chegou nessa loja?
  var index = Util.rand($("#" + id + " option").length);
  $("#" + id).prop("selectedIndex", index);
}
