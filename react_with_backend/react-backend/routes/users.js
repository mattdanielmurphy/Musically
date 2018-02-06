var express = require('express');
var router = express.Router();

var dbConfig = {
  client: 'postgresql',
  debug: true,
  connection: {
    host     : 'localhost',
    database : 'final',
    charset: 'utf8'
  }
};
const knex = require('knex')(dbConfig);
var DataHelpers = require('../lib/util/data_helpers.js')(knex);


/* GET users listing. */
router.get('/', function(req, res, next) {
  DataHelpers.getAllUsers().
    then((users) => {
      console.log(users)
      res.json(users)
    })
});

/* Post a new user session */

router.post('/register', function(req, res, next) {
  let { email, password, username } = req.body;
  DataHelpers.createNewUser(email, password, username).then()
})

router.post('/login', function(req, res, next) {
  let { email, password } = req.body;

  if (email && password){
    DataHelpers.getUserByLogin(email, password).then((result) => {
      if(!result[0]){
        res.status(400).send('Could not find user')
      } else {
        res.json(result[0])
      }
    })
  } else {
    return res.status(400).send({ error:true, message: 'Please provide both of your email and password' })
  }
})


module.exports = router;
