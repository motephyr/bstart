
require('./table_field_xs')
require('./table_field_ys')
require('./table_values')
var Bookshelf = require('./base');

var TableField = Bookshelf.Model.extend({
  tableName: "table_fields",
  table_field_xs: function () {
    // one-to-many
    return this.hasMany('TableFieldX');
  },
  table_field_ys: function () {
    // one-to-many
    return this.hasMany('TableFieldY');
  },
  table_values: function () {
    return this.hasMany('TableValue')
  }
},{
  dependents: ['table_field_xs', 'table_field_ys']
});

var TableFields = Bookshelf.Collection.extend({
  model: TableField
});

module.exports = {
  TableField: Bookshelf.model('TableField', TableField),
  TableFields: Bookshelf.collection('TableFields', TableFields)
}
