
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
        {user_id: 2, name: 'Great collection', description: 'A collection of tracks build by Matt'},
        {user_id: 3, name: 'Collection for Vasily', description: 'A collection of tracks created by Vasily'},
        {user_id: 1, name: 'Chun\'s initial collection', description: 'A very first collection of tracks created by Chun'}
      ])

    }).then(function(){
      return knex('tracks').insert([
        {name: 'New loop', music_collection_id: 1, recorded_date: '2018-01-29', song: JSON.stringify([{A4: 1},{G4: 2},{G4: 3},{E4: 4},{A2: 5}]), user_id: 2},
        {name: 'Vasily new loop', music_collection_id: 2, recorded_date: '2018-01-29', song: JSON.stringify([{G3: 1},{F3: 2},{D3: 3},{E2: 4}]) , user_id: 3},
        {name: 'My loop', music_collection_id: 3, recorded_date: '2018-01-29', song: JSON.stringify([{D4: 1},{B3: 2},{F2: 3}]) , user_id: 1}
      ])
    });
};
