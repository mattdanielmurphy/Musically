
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('users').del(),
    knex('music_collections').del(),
    knex('tracks').del()
  ]).then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Chun', email: 'chun@gmail.com', password: 'pass'},
        {username: 'Matthew', email: 'matt@gmail.com', password: 'pass'},
        {username: 'vasily', email: 'vasily@gmail.com', password: 'pass'}
      ]);
    }).then(function(){
      return knex('music_collections').insert([
        {user_id: 2, name: 'Beethoven'},
        {user_id: 3, name: 'EscapeRoom'},
        {user_id: 1, name: 'Mozart'}
      ])

    }).then(function(){
      return knex('tracks').insert([
        {name: 'Moonlight', music_collection_id: 1, recorded_date: '2018-01-29', path: './music_bank/Moonlight', user_id: 2},
        {name: 'Sherlocked', music_collection_id: 2, recorded_date: '2018-01-29', path: './music_bank/Sherlocked', user_id: 3},
        {name: 'The Marriage of Figaro', music_collection_id: 3, recorded_date: '2018-01-29', path: './music_bank/The_Marriage_of_Figaro', user_id: 1}
      ])
    });
};
