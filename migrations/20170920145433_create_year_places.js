
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('year_places', function(table){
      table.increments('id').primary();
      table.integer('year').unsigned().notNullable().index()
      table.string('place', 255).notNullable().index();      
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('year_places')  
};