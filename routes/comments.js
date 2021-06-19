var express = require('express');
var router = express.Router();
const commentRepo = require('../respositories/comments')
const isSupper = require('./auth')

/* GET comment listing. */
router.get('/', async function(req, res, next) {
  await commentRepo.getComments(req.query.offset, req.query.limit)
  .then(data => res.send(data));
});

router.get('/:id', async function(req, res, next) {
    await commentRepo.getComment(req.params.id)
    .then(data => res.send(data));
  });

router.post('/:articlesID', isSupper, async function(req, res, next) {
  res.send(await commentRepo.addComment(req.body, req.params.articlesID));
});

router.put('/', isSupper, async function(req, res, next) {
  res.send(await commentRepo.updateComment(req.body))
});

router.delete('/:id', isSupper, async function(req, res, next) {
  res.send(await commentRepo.deleteComment(req.params.id))
});

module.exports = router;
