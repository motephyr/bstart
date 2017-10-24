
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('session', function(table){
      table.string('sid').primary();      
      table.json('sess').notNullable();      
      table.dateTime('expire').notNullable();
      
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('session')    
};
