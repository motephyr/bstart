require('./table_fields')

var Bookshelf = require('./base');

var YearPlace = Bookshelf.Model.extend({
  tableName: "year_places",
  table_fields: function () {
    return this.hasMany('TableField')
  }
},{
});

var YearPlaces = Bookshelf.Collection.extend({
  model: YearPlace
});

module.exports = {
  YearPlace: Bookshelf.model('YearPlace', YearPlace),
  YearPlaces: Bookshelf.collection('YearPlaces', YearPlaces)
}
