
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('table_fields', function(table){
      table.increments('id').primary();
      table.string('year').notNullable().index()
      table.string('field', 255); 
      table.string('sub_field', 255);          
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('table_fields')  
};