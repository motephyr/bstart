
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('item_names', function(table){
      table.increments('id').primary();
      table.integer('year_place_id').notNullable().index()
      table.string('name', 255);      
      table.string('kind', 255);    
      table.timestamp('deleted_at');      
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item_names')  
};