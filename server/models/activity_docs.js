

var Bookshelf = require('./base');

var ActivityDoc = Bookshelf.Model.extend({
  tableName: "activity_docs"
},{
});

var ActivityDocs = Bookshelf.Collection.extend({
  model: ActivityDoc
});

module.exports = {
  ActivityDoc: Bookshelf.model('ActivityDoc', ActivityDoc),
  ActivityDocs: Bookshelf.collection('ActivityDocs', ActivityDocs)
}
