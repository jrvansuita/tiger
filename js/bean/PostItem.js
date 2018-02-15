const Util = require(_jsdir + 'util/utils.js');
const Consts = require(_jsdir + 'res/consts.js');

module.exports = class PostItem {

  constructor(product, sugested) {
    this.product = product;
    this.setSugested(sugested);
  }

  setSugested(sugested) {
    this.descriptionPattern = sugested.getDescription();
    this.buyLinkPattern = sugested.getBuyLinkHolder();
    this.hashtags = sugested.getHashTags();
  }

  getPatternDescription() {
    return this.descriptionPattern;
  }

  setPatternsDescription(pattern) {
    this.descriptionPattern = pattern;
  }

  getPatternBuyLink() {
    return this.buyLinkPattern;
  }

  setPatternBuyLink(pattern) {
    this.buyLinkPattern = pattern;
  }

  getHashTags() {
    return this.applyHashHolders(this.hashtags);
  }

  applyHashHolders(s) {
    return s.replaceAll('{.brand}', this.product.brand.replace(/ /g, ''))
      .replaceAll('{.category}', this.product.category.replace(/ /g, ''));
  }

  getHashTagsArray() {
    var hashtags = [];

    this.getHashTags().split(' ').forEach(function(item, index) {
      if (item) {
        hashtags.push(item.replace('#', '').trim());
      }
    });

    return hashtags;
  }

  setHashTags(pattern) {
    this.hashtags = pattern;
  }

  getBuildedDescription() {
    return this.applyDescHolders(this.getPatternDescription());
  }

  applyDescHolders(s) {
    return s.replaceAll('{.price}', Util.money(this.product.price))
      .replaceAll('{.brand}', this.product.brand)
      .replaceAll('{.gender}', Util.gender(this.product.gender))
      .replaceAll('{.color}', this.product.color)
      .replaceAll('{.category}', this.product.category);
  }

  getDescription() {
    return this.description;
  }

  setShortBuyLink(short) {
    this.shortBuyLink = short;
  }

  getShortBuyLink() {
    return this.shortBuyLink;
  }



  setBuyLink(buyLink, source, medium, name) {
    this.buyLink = buyLink;
    this.campaignSource = source;
    this.campaignMedium = medium;
    this.campaignName = name;
  }

  // getBuyLink(){
  //   return this.buyLink;
  // }

  getCampaignBuyLink() {
    return this.getShortBuyLink() ? this.getShortBuyLink() : Util.buildTrackableUrl(this.buyLink, this.campaignSource, this.campaignMedium, this.campaignName);
  }

  getBuildedBuyLink() {
    return this.getPatternBuyLink().replace('{.link}', this.getCampaignBuyLink());
  }

  getBuildedCaption() {
    return this.getBuildedDescription() + '\n\n' +
      this.getBuildedBuyLink() + '\n\n' +
      this.getHashTags();
  }

  getBuyLink() {
    return this.buyLink ? this.buyLink : '';
  }

  getCampaignSource() {
    return this.campaignSource ? this.campaignSource : '';
  }

  getCampaignMedium() {
    return this.campaignMedium ? this.campaignMedium : '';
  }

  getCampaignName() {
    return this.campaignName ? this.campaignName : '';
  }


  /** Build object for facebook Upload **/

  assertFacebook() {
    var caption = this.getBuildedCaption();
    var productImage = this.product.imageUrl;

    //*var _self = this;
    //delete all attributes from this
    //*Object.keys(_self).forEach(function(key) { delete _self[key]; });

    //Facebook mandatory attributes
    this.caption = caption;
    this.url = productImage;
    this.published = false;

    return this;
  }

};