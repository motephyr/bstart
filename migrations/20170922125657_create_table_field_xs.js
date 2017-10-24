
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('table_field_xs', function(table){
      table.increments('id').primary();
      table.integer('table_field_id').notNullable().index()
      table.integer('location').notNullable().index()
      table.string('value').notNullable().index()         
      table.timestamp('deleted_at');      
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('table_field_xs')  
};