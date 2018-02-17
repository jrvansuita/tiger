const Consts = require(_jsdir + 'res/consts.js');

module.exports = class Suggested {

  constructor() {
    this.description = '';
    this.linkHolder = '';
    this.hashtags = '';
  }

  getDescription() {
    return this.description;
  }

  getBuyLinkHolder() {
    return this.linkHolder;
  }

  getHashTags() {
    return this.hashtags;
  }

  setDescription(d) {
    this.description = d;
  }

  setBuyLinkHolder(d) {
    this.linkHolder = d;
  }

  setHashTags(d) {
    this.hashtags = d;
  }

  isCompleted() {
    var completed = true;
    Object.values(this).map(function(val) {
      completed = completed & val !== '';
    });

    return completed;
  }

};