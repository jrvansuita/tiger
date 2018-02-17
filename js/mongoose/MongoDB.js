var mongoose = require('mongoose');

//mlab.com
//jr@boutiqueinfantil.com.br
//jrboutique
//1vansuitaboutique

mongoose.connect('mongodb://tigeruser:pass@ds131698.mlab.com:31698/tigerdb');

global.TemplatesMDb = getStringModel('Templates');

function getStringModel(name) {
  if (mongoose.models[name] === undefined) {
    return mongoose.model(name, getDefaultStringSchema());
  } else {
    return mongoose.model(name);
  }
}



function getDefaultStringSchema() {
  return new mongoose.Schema({
    item: String,
    type: String
  });
}