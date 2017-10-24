
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('bookstart_names', function(table){
      table.increments('id').primary();
      table.integer('year_place_id').notNullable().index()
      table.json('name')
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bookstart_names')  
};