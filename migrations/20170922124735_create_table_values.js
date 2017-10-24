
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('table_values', function(table){
      table.increments('id').primary();
      table.integer('table_field_id').notNullable().index()
      table.integer('table_field_x_id').notNullable().index()
      table.integer('year_place_id').notNullable().index()
      table.json('value')
             
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('table_values')  
};