const Consts = require(_jsdir + 'res/consts.js');

module.exports = class RandomDesc{

  constructor() {
    this.description = Consts.randomDescription();
    this.linkHolder = Consts.randomBuyLink();
    this.hashtags = Consts.randomHashTags();
  }

  getDescription(){
    return this.description;
  }

  getBuyLinkHolder(){
    return this.linkHolder;
  }

  getHashTags(){
    return this.hashtags;
  }

  setDescription(d){
    this.description = d;
  }

  setBuyLinkHolder(d){
    this.linkHolder = d;
  }

  setHashTags(d){
    this.hashtags = d;
  }

};
