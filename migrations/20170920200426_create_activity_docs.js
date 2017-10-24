
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('activity_docs', function(table){
      table.increments('id').primary();
      table.integer('year_place_id').notNullable().index()
      table.json('value');      
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activity_docs')  
};