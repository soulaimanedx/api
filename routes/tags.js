var express = require('express');
var router = express.Router();
const tagRepo = require('../respositories/tags')
const isSupper = require('./auth')

/* GET tag listing. */
router.get('/', async function(req, res, next) {
  await tagRepo.getTags(req.query.offset, req.query.limit)
  .then(data => res.send(data));
});

router.get('/:id', async function(req, res, next) {
    await tagRepo.getTag(req.params.id)
    .then(data => res.send(data));
  });

router.post('/:articlesID', isSupper, async function(req, res, next) {
  res.send(await tagRepo.addTag(req.body, req.params.articlesID));
});

router.put('/', isSupper, async function(req, res, next) {
  res.send(await tagRepo.updateTag(req.body))
});

router.delete('/:id', isSupper, async function(req, res, next) {
  res.send(await tagRepo.deleteTag(req.params.id))
});

module.exports = router;
