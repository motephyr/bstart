
exports.up = function(knex, Promise) {
  return Promise.all([    
    knex.schema.table('year_places', function(table){
      table.boolean('is_show').defaultTo(true);      
      table.timestamp('editable_at');      
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('year_places', function(table){
      table.dropColumn('is_show');       
      table.dropColumn('editable_at');
    })
  ])
};
