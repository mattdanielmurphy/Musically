# Musically
Musically is an intuitive and easy way to create music loops in the browser that you can share with anyone.Tech stack includes Tone.js handle browser audio, use React as front end and Express as backend, And I use PostgreSQL for Database. Right now, you can register an account and play with nodegrid and save your loops. And you can also import your saved loops from your collection to compose page and play it for fun. This project will continuing update. Hopefully one day this will become a huge awesome project!

## How to setup
* Since we have the database, you have to create a PostgreSQL database called final, then you can use "knex migrate:latest" to create table and "knex seed:run" to seed your databse.

* Open two terminal windows. First one stay in react-backend folder and the other one stay in client folder. then run npm install to install dependencies on both terminals.

* Run node bin/www in react-backend folder terminal and run npm start in client folder terminal to start the frontend and backend servers, and now you can use website in localhost:3000.

* Have fun.

