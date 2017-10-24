exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('table_field_xs', function(table){
      table.text('description');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('table_field_xs', function(table){
      table.dropColumn('description');
    })
  ])
};