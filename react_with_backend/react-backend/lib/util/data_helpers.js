'use strict'
// var dbConfig = {
//   client: 'postgresql',
//   debug: true,
//   connection: {
//     host     : 'localhost',
//     user     : 'labber',
//     password : 'labber',
//     database : 'final',
//     charset: 'utf8'
//   }
// };
// const knex = require('knex')(dbConfig);
//All database helper functions
module.exports = function dataQueries(knex) {
  return {
    getAllUsers() {
      return knex.select('*').from('users')
    },
    createNewUser(email, password, username){
      return knex('users')
        .insert({
          'email': email,
          'password': password,
          'username': username
        })
        .returning('*');
    },
    getUserByLogin(email, password){
      return knex('users')
        .select()
        .where({
          "email": email,
          "password": password
        });
    },
    getUserByName(username){
      return knex('users')
        .select()
        .where({
          'username': username
        })
    },
    getMusicByUserId(id){
      return knex('music_collections')
        .select()
        .where({
          'user_id': id
        })
    },
    getTracksByMusicCollectionId(id){
      return knex('tracks')
        .select()
        .where({
          'music_collections_id': id
        });
    }
  }
}