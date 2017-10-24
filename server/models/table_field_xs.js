

require('./table_fields')
require('./table_values')
var Bookshelf = require('./base');

var TableFieldX = Bookshelf.Model.extend({
  tableName: "table_field_xs",
  table_field: function () {
    return this.belongsTo('TableField')
  },
  table_values: function () {
    return this.hasMany('TableValue')
  }
},{
});

var TableFieldXs = Bookshelf.Collection.extend({
  model: TableFieldX
});

module.exports = {
  TableFieldX: Bookshelf.model('TableFieldX', TableFieldX),
  TableFieldXs: Bookshelf.collection('TableFieldXs', TableFieldXs)
}
