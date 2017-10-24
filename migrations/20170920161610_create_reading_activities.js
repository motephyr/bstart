
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('reading_activities', function(table){
      table.increments('id').primary();
      table.integer('year_place_id').notNullable().index()
      table.integer('item_name_id').notNullable().index()      
      table.json('value');
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reading_activities')  
};