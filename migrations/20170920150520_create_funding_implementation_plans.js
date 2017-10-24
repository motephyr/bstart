
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('funding_implementation_plans', function(table){
      table.increments('id').primary();
      table.integer('year').unsigned().notNullable().index()
      table.string('name', 255);      
      table.timestamp('deleted_at')
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('funding_implementation_plans')  
};