module.exports = class Post {
  constructor() {
    this.items = [];
    this.attached_media = [];
    this.is_instagram_eligible = true;
    this.makeCheckIn = false;
  }

  setSchedule(date) {
    if (date) {
      this.published = false;
      this.scheduled_publish_time = Math.round(date.getTime() / 1000);
      this.unpublished_content_type = 'SCHEDULED';
    } else {
      delete this.published;
      delete this.scheduled_publish_time;
      delete this.unpublished_content_type;
    }
  }

  addItem(item) {
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }

  reorder(order) {
    var ordered = [];

    var _self = this;
    //Asset corret order for publish post
    order.forEach(function(sku) {
      _self.getItems().forEach(function(item) {
        if (item.product.sku === sku) {
          ordered.push(item);
          return;
        }
      });
    });

    this.items = ordered;
  }

  addAttachedMedia(id, index) {
    this.attached_media.splice(index, 0, {
      media_fbid: id.toString()
    });
  }

  hasIdMediasForAll() {
    return this.attached_media.length == this.getItems().length;
  }


  clearMedias() {
    this.attached_media = [];
  }

  /** Build object for facebook Upload **/
  assertItemsFacebook() {
    this.clearMedias();

    this.items.forEach(function(item, i) {
      item.assertFacebook();
    });
  }

  setCheckIn(makeCheckIn) {
    this.makeCheckIn = makeCheckIn;
  }

  assertFacebook() {
    var message = this.getItems()[0].getBuildedCaption(true);

    this.message = message ? message : this.getItems()[0].getBuildedCaption();

    if (this.makeCheckIn) {
      this.place = Keep.facebookPageId();
    } else {
      delete this.makeCheckIn;
    }

    return this;
  }


  assertInstagram() {
    var firstItem = this.getItems()[0];

    var message = firstItem.getBuildedDescription() + '\n\n' +
      firstItem.getBuildedBuyLink() + '\n\n' +
      cnt.link_bio +
      firstItem.getHashTags();

    this.message = message;
    this.disabledComments = false;
    this.instaMedias = [];
  }


  addMedia(order, buffer) {

    var item = {};
    item.type = 'photo';
    item.data = buffer;
    //item.url = url;
    item.order = order;
    item.size = [720, 720];

    this.instaMedias.push(item);
  }

  getMedias() {
    return this.instaMedias;
  }

  assertItemInstagram() {
    this.instaMedias.sort(function(a, b) {
      return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
    });
  }

  hasMediasForInsta() {
    return this.getMedias().length === this.getItems().length;
  }
};