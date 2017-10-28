

var Bookshelf = require('./base');

var SendActivity = Bookshelf.Model.extend({
  tableName: "send_activities"
},{
});

var SendActivities = Bookshelf.Collection.extend({
  model: SendActivity
});

module.exports = {
  SendActivity: Bookshelf.model('SendActivity', SendActivity),
  SendActivities: Bookshelf.collection('SendActivities', SendActivities)
}
