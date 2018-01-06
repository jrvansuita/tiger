
const db = require(_jsdir + 'db/DataBase.js');

module.exports =  {

  onChange : function(element, callbacak) {
    var min = new Date();
    min.setMinutes(new Date().getMinutes() + 5);



    element.calendar({
      ampm: false,
      minDate: min,
      monthFirst: false,
      disableYear: true,
      onChange: function (date, text, mode) {
        callbacak(date);

        var selected = new Date(date.getTime());

        var start = Math.round(selected.getTime() / 1000);
        selected.setHours(selected.getHours()+1);
        var end = Math.round(selected.getTime() / 1000);

        db.posts().find({ $and: [{ scheduled_publish_time: {$gte: start}},
          { scheduled_publish_time: {$lte: end} }] },
          function (err, docs) {

            docs.forEach(function (item, index) {
               var d = new Date(item.scheduled_publish_time * 1000);
               var hour = d.getHours() + ":" + ('0' + d.getMinutes()).slice(-2);
               $('td:contains("'+hour+'")').css('background', 'rgba(122, 199, 107, 0.45)');
            });
          });

      }});
    },


  };
