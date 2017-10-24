
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('photos', function(table){
      table.increments('id').primary();
      table.integer('year_place_id').notNullable().index()
      table.string('area', 255);      
      table.string('file_name', 255);  
      table.string('description');    
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos')  
};