require('./table_field_xs')
require('./table_fields')

var Bookshelf = require('./base');

var TableValue = Bookshelf.Model.extend({
  tableName: "table_values",
  table_field: function () {
    return this.belongsTo('TableField')
  },
  table_field_x: function () {
    return this.belongsTo('TableFieldX')
  }
},{
});

var TableValues = Bookshelf.Collection.extend({
  model: TableValue
});

module.exports = {
  TableValue: Bookshelf.model('TableValue', TableValue),
  TableValues: Bookshelf.collection('TableValues', TableValues)
}
