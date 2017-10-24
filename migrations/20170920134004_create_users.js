
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('_id').primary();
      table.string('name', 255);
      table.string('email', 255).index().unique();
      table.string('derived_key', 255);
      table.string('salt', 255);
      table.string('signupToken', 255).index();
      table.dateTime('signupTimestamp').defaultTo(knex.raw('now()'));
      table.dateTime('signupTokenExpires')
      table.integer('failedLoginAttempts')
      table.dateTime('emailVerificationTimestamp')
      table.boolean('emailVerified')
      table.string('pwdResetToken', 255);
      table.dateTime('pwdResetTokenExpires')
      table.boolean('accountLocked');
      table.dateTime('accountLockedUntil')
      table.dateTime('previousLoginTime')
      table.string('previousLoginIp', 255);
      table.dateTime('currentLoginTime')
      table.string('currentLoginIp', 255);
      table.string('authenticationToken', 255);
      
      // table.timestamp('created_at').defaultTo(knex.raw('now()'))
      // table.timestamp('updated_at').defaultTo(knex.raw('now()'))
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')  
};
