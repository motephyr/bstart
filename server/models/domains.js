
require('./users')
var Bookshelf = require('./base');

var Domain = Bookshelf.Model.extend({
  tableName: "domains",
  // hasTimestamps : true,
  domainusers: function () {
    // one-to-many
    return this.hasMany('Domainuser');
  },
  rooms: function () {
    // one-to-many
    return this.hasMany('Room');
  },
  messages: function () {
    // one-to-many
    return this.hasMany('Message');
  },
  participants: function () {
    // one-to-many
    return this.hasMany('Participant');
  },

  user: function () {
    return this.belongsTo('User', 'user_id', '_id')
  }
},{
  dependents: ['domainusers', 'rooms', 'messages', 'participants']
});

var Domains = Bookshelf.Collection.extend({
  model: Domain
});

module.exports = {
  Domain: Bookshelf.model('Domain', Domain),
  Domains: Bookshelf.collection('Domains', Domains)
}
