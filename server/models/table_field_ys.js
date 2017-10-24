
require('./table_fields')
var Bookshelf = require('./base');

var TableFieldY = Bookshelf.Model.extend({
  tableName: "table_field_ys",

  table_field: function () {
    return this.belongsTo('TableField')
  }
},{
});

var TableFieldYs = Bookshelf.Collection.extend({
  model: TableFieldY
});

module.exports = {
  TableFieldY: Bookshelf.model('TableFieldY', TableFieldY),
  TableFieldYs: Bookshelf.collection('TableFieldYs', TableFieldYs)
}
