var express = require('express');
var router = express.Router();
var path = require('path');

/* GET musics listing. */
router.get('/', function(req, res, next) {
  res.json([{
    location: '/systemMusicFiles/Sherlocked.mid',
    name: 'Sherlocked',
    id: 1
  },{
    location: '/systemMusicFiles/Moonlight.mid',
    name: 'Moonlight',
    id: 2
  }]);
});

router.get('/:file', function(req, res) {
  var pathToFile = path.join(__dirname, '..', 'public', 'systemMusicFile', req.params.file)
  res.download(pathToFile, req.params.file)
});

module.exports = router;