module.exports = class Post {
  constructor() {
    this.items = [];
    this.attached_media = [];
    this.is_instagram_eligible = true;
    this.makeCheckIn = false;
  }

  setPage(page){
    this.page = page;
  }

  setSchedule(date){
    if (date){
      this.published = false;
      this.scheduled_publish_time = Math.round(date.getTime() / 1000);
      this.unpublished_content_type = 'SCHEDULED';
    }else{
      delete this.published;
      delete this.scheduled_publish_time;
      delete this.unpublished_content_type;
    }
  }

  addItem(item){
    this.items.push(item);
  }

  getItems(){
    return this.items;
  }

  reorder(order){
    var ordered = [];

    var _self = this;
    //Asset corret order for publish post
    order.forEach(function(sku){
      _self.getItems().forEach(function(item){
        if (item.product.sku === sku){
          ordered.push(item);
          return;
        }
      });
    });

    this.items = ordered;
  }

  addAttachedMedia(id, index){
    this.attached_media.splice(index, 0, {media_fbid: id.toString()});
  }

  hasIdMediasForAll(){
    return this.attached_media.length == this.getItems().length;
  }


  clearMedias(){
    this.attached_media = [];
  }

  /** Build object for facebook Upload **/
  assertItemsFacebook(){
    this.clearMedias();

    this.items.forEach(function(item, i){
      item.assertFacebook();
    });
  }

  setCheckIn(makeCheckIn){
    this.makeCheckIn = makeCheckIn;
  }

  getPage(){
    return this.page;
  }


  assertFacebook(){
    var message = this.getItems()[0].caption;

    this.message = message ? message : this.getItems()[0].getBuildedCaption();

    //delete some attributes from this
    //*delete this.items;

    //Não estou mais excluindo a atributo page para o request do Facebook
    //O facebook não interpreta ou usa esse atributo
    //delete this.page;

    if  (this.makeCheckIn){
      this.place = this.page.id;
    }else{
      delete this.makeCheckIn;
    }

    return this;
  }

};
