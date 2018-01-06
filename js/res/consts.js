const Ustil = require(_jsdir + 'util/utils.js');

function random(array) {
  return array[Ustil.rand(array.length)];
}

module.exports = {
  descriptions : ["Deu a louca na Boutique Infantil! 😱 {.category} a partir de {.price}.",
  "Promoção de hoje: {.category} por somente {.price}!",
  "Aproveite antes que acabe os estoques! {.category} por {.price}.",
  "{.category} por somente {.price}!",
  "{.category} somente hoje por apenas {.price}! 😻",
  "Corre que é promo relâmpago ⚡ \n\n {.category} por apenas {.price}!",
  "Hora de se preparar para a promoção! 😍 \n\n {.category} a partir de {.price}.",
  "Confira essa super promoção. 😍 \n\n {.category} por somente {.price}.",
  "Toda a marca {.brand} com descontos incríveis! 💸 \n\n {:category} por apenas {.price}.",
  "Fique de olho na {.brand} essa semana está tudo em promoção. 😲 \n\n Preços començando em {.price}.",
  "Nova promoção: Produtos para {.gender} 👲 por apenas {.price}.",
  "Vem garantir o melhor combo de roupinhas para os pequenos! 😄 \n\n Roupinhas para {.gender} por apenas {.price}!",
  "Own, nossos pimpolhos ficam um gracinha com esses {.category} não é mesmo? 💛 \n\n {.category} por somente {.price}. ",
  "Essa promo é um verdadeiro sucesso! {.category} por {.price} 😱😱 Corre para garantir os lookinhos dos pequenos por um precinho incrível!!",
  "A cor {.color} está super na moda não é mesmo mamães? 😍 \n\n {.category} por somente {.price} é só na Boutique Infantil mesmo! 🙌"

],

hashtags : ["MuitoBarato",
"Baratíssimo",
"SóHoje",
"SuperOferta",
"Promoção",
"Ofertão",
"PreçoBaixo",
"TudoLindo",
"{.brand}",
"{.category}"
],

buyLink : ["Compre em: {.link} 👈😮",
"Compre agora: {.link}",
"Acesse em: {.link} 👈",
"Confira: 👉 {.link}",
"Acesse: {.link} ⬅",
"Clique aqui: 👉 {.link}",
],

randomDescription: function() {
  return random(this.descriptions);
},

randomBuyLink: function(){
  return random(this.buyLink);
},

randomHashTags: function() {
  var hashtagsStr = '#BoutiqueInfantil';
  var exists = [];
  var maxTags = 2;

  do {
    var tag = random(this.hashtags);

    if (!exists[tag]){
      hashtagsStr += ' #' + tag;
      exists[tag] = true;
    }
  } while (Object.keys(exists).length < 2);

  return hashtagsStr;
}
};
