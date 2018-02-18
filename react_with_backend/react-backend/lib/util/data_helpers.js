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
    createNewTrack(name, song, userId, collectionName){
      return knex('tracks')
        .insert({
          'name': name,
          'recorded_date': new Date(),
          'song': JSON.stringify(song),
          'user_id': userId,
          'music_collection_id': collectionName
        })
        .returning('*')
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
          'music_collection_id': id
        })
    },
    findOrCreateMusicCollection(collection) {
      return knex('music_collections')
        .select('*')
        .where({
          'name': collection.name
        })
        .then((collection) => {
          return new Promise((resolve, reject) => {
            if (collection && collection.id) {
              resolve(collection);
            } else {
              knex('music_collections')
                .insert(collection)
                .returning('*')
                .then(res => {
                  resolve(res)
                })
                .catch(err => {
                  reject(err)
                })
            }
          })
        })
    },
    getMusicCollectionIdByName(name){
      return knex('music_collections')
        .select('id')
        .where({
          'name': name
        })
    }
  }
}