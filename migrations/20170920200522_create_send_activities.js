
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('send_activities', function(table){
      table.increments('id').primary();
      table.integer('year_place_id').notNullable().index()
      table.string('file_name', 255);      
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('send_activities')  
};