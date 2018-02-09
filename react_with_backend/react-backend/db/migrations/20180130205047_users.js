
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('username');
        table.string('email');
        table.string('password')
      }),
      knex.schema.createTable('music_collections', (table) => {
        table.increments('id')
        table.integer('user_id');
        table.string('name');
        table.string('description');
      }),
      knex.schema.createTable('tracks', (table) => {
        table.string('name');
        table.increments('id');
        table.date('recorded_date');
        table.json('song');
        table.integer('music_collection_id')
        table.integer('user_id');
      })
  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('music_collections'),
    knex.schema.dropTable('tracks')
  ])
};
