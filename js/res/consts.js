const Ustil = require(_jsdir + 'util/utils.js');

function random(array) {
  return array[Ustil.rand(array.length)];
}

module.exports = {
  descriptions: ["Deu a louca na Boutique Infantil! 😲 {.category} a partir de {.price}.",
    "Promoção de hoje 🙌: {.category} por somente {.price}!",
    "Aproveite antes que acabe os estoques! {.category} por {.price}.",
    "{.category} por somente {.price}!",
    "{.category} somente hoje por apenas {.price}! 🎁",
    "Corre que é promo relâmpago ⚡ \n\n {.category} por apenas {.price}!",
    "Hora de se preparar para a promoção! 😍 \n\n {.category} a partir de {.price}.",
    "Confira essa super promoção. 💛 \n\n {.category} por somente {.price}.",
    "Toda a marca {.brand} com descontos incríveis! 😋 \n\n {:category} por apenas {.price}. 😍",
    "Fique de olho na {.brand} essa semana está tudo em promoção. 🤗 \n\n Preços começando em {.price}.",
    "Nova promoção: Produtos para {.gender} por apenas {.price}.",
    "Vem garantir o melhor combo de roupinhas para os pequenos! 💓 \n\n Roupinhas para {.gender} por apenas {.price}!",
    "Own, nossos pimpolhos ficam uma gracinha com esses {.category} não é mesmo? ❣ \n\n {.category} por somente {.price}. ",
    "Essa promo é um verdadeiro sucesso! {.category} por {.price} 💕 Corre para garantir os melhores produtos para os pequenos por um precinho incrível!!",
    "A cor {.color} está super na moda não é mesmo mamães? 💘 \n\n {.category} por somente {.price} é só na Boutique Infantil mesmo! 🛍",
    "Outlet de Roupinhas e Calçados com até 80%Off 🛍",
    "Especial para as mamães! 👧 \n\n {.category} por somente {.price}, só hoje.",
    "Encontre aqui os lookinhos mais lindos para os seus pequenos por um precinho irresistível ✨ \n\n Nossos produtos a partir de {.price}.",
    "OFERTA DO DIA! 👑 \n\n {.category} por apenas {.price}!",
    "Venha conferir suas marcas preferidas com um descontão! ❤️ \n\n Outlet com até 60% Off",
    "Top Marcas de {.category} a partir de {.price}!",
    "Para o dia a dia dos pequenos ❤ \n\n {.category} com até 75%Off",
    "Levante a mão ou marque quem vai morrer de vontade de comprar todas as peças desse post! 🙋‍🙋",
    "O melhor preço do Brasil você só encontra na Boutique Infantil 💎 \n\n {.category} por somente {.price}"
  ],

  hashtags: ["MuitoBarato",
    "Baratíssimo",
    "SóHoje",
    "SuperOferta",
    "Promoção",
    "Outlet",
    "Top",
    "ModaInfantil",
    "ModaBebe",
    "PegandoFogo",
    "SuperDescontos",
    "Preçinho",
    "ParaAproveitar",
    "Ofertão",
    "PreçoBaixo",
    "TudoLindo",
    "{.brand}",
    "{.category}"
  ],

  buyLink: ["Compre em: {.link} 👈",
    "Compre agora: {.link}",
    "Acesse em: {.link} 👈",
    "Confira: 👉 {.link}",
    "Acesse: {.link} ⬅",
    "Clique aqui: 👉 {.link}",
    "Aproveite: {.link}",
    "Acesse agora: {.link}",
    "Vamos comprar? {.link} 👈",
    "Venha conferir: {.link}",
  ],

  randomDescription: function() {
    return random(this.descriptions);
  },

  randomBuyLink: function() {
    return random(this.buyLink);
  },

  randomHashTags: function() {
    var hashtagsStr = '#BoutiqueInfantil';
    var exists = [];
    var maxTags = 2;

    do {
      var tag = random(this.hashtags);

      if (!exists[tag]) {
        hashtagsStr += ' #' + tag;
        exists[tag] = true;
      }
    } while (Object.keys(exists).length < 2);

    return hashtagsStr;
  }
};