
exports.up = function(knex, Promise) {
  return Promise.all([    
    knex.schema.table('users', function(table){
      table.string('account', 255);      
      table.string('phone', 255);     
      table.string('mobile', 255);      
      table.string('area', 255);   
      table.timestamp('created_at').defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').defaultTo(knex.raw('now()'))   
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropColumn('account');
      table.dropColumn('phone');
      table.dropColumn('mobile');
      table.dropColumn('area');
    })
  ])
};
