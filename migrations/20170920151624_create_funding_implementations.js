
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('funding_implementations', function(table){
      table.increments('id').primary();
      table.integer('funding_implementation_plan_id').notNullable().index()
      table.integer('year_place_id').notNullable().index()
      table.integer('month')      
      table.integer('current_account')      
      table.integer('capital_account')      
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('funding_implementations')  
};