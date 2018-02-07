
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('music_collections', (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    }),
    knex.schema.alterTable('tracks', (table) => {
      table.foreign('music_collection_id').references('music_collections.id').onDelete('CASCADE');
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('music_collections', (table) => {
      table.dropForeign('user_id');
    }),
    knex.schema.alterTable('tracks', (table) => {
      table.dropForeign('music_collection_id');
      table.dropForeign('user_id');
    })
  ]);
};
