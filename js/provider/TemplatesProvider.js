var MongoDb = require(_jsdir + 'mongoose/MongoDb.js');
const db = require(_jsdir + 'db/DataBase.js');
const Suggested = require(_jsdir + 'bean/Suggested.js');

var completed;
var suggested;

module.exports = {

  init(completed) {

  },

  find(criteria, callback) {
    completed = callback;
    suggested = new Suggested();

    findDescrition(criteria, function(s) {
      suggested.setDescription(s);
      callCompleted();
    });

    findLinkHolder(criteria, function(s) {
      suggested.setBuyLinkHolder(s);
      callCompleted();
    });

    findHashtags(criteria, function(s) {
      suggested.setHashTags(s);
      callCompleted();
    });
  }
};

function callCompleted() {
  if (suggested.isCompleted()) {
    completed(suggested);
  }
}




function findHashtags(criteria, callback) {
  var notIncluded = getNotIncludedRegexQuery(criteria);

  var select = {
    $and: [{
      type: 'hashtag',
    }]
  };

  if (notIncluded) {
    select.$and.push(notIncluded);
  }

  TemplatesMDb.find(select, function(err, docs) {
    var hashtagsStr = '#BoutiqueInfantil';
    var exists = [];
    var maxTags = 4;

    do {
      var tag = Util.randItem(docs).item;

      if (!exists[tag]) {
        hashtagsStr += ' #' + tag;
        exists[tag] = true;
      }
    } while (Object.keys(exists).length < maxTags);

    callback(hashtagsStr);
  });
}


function findLinkHolder(criteria, callback) {
  var select = {
    $and: [{
      type: 'link',
    }, {
      item: {
        $regex: '{.link}'
      }
    }]
  };

  TemplatesMDb.find(select, function(err, docs) {
    callback(Util.randItem(docs).item);
  });
}

function findDescrition(criteria, callback) {
  var notIncluded = getNotIncludedRegexQuery(criteria);

  var select = {
    $and: [{
      type: 'desc',
    }]
  };

  if (notIncluded) {
    select.$and.push(notIncluded);
  }

  TemplatesMDb.find(select, function(err, docs) {
    callback(Util.randItem(docs).item);
  });
}

function getNotIncludedRegexQuery(criteria) {

  var query = (Object.values(criteria.matching(false)).map(function(s) {
    return '{.' + s + '}';
  }).join('|'));


  if (query) {
    return {
      item: {
        $not: new RegExp('(' + query + ')')
      }
    };
  } else {
    return undefined;
  }
}









// updateAll() {
//   msg.loading();
//   TemplatesMDb.find({}, function(err, docs) {
//     db.templates().remove({}, {
//       multi: true
//     }, function(err, numRemoved) {
//
//       docs.forEach(function(doc) {
//         var item = doc._doc;
//         delete item._id;
//
//         db.templates().insert(item);
//       });
//
//       msg.sucess(cnt.allTemplatesUpdated);
//     });
//   });
//
// }