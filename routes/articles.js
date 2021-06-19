var express = require('express');
var router = express.Router();
const articleRepo = require('../respositories/articles')
const isSupper  = require('./auth')

/* GET article listing. */
router.get('/', async function(req, res, next) {
  await articleRepo.getArticles(req.query.offset, req.query.limit)
  .then(data => res.send(data));
});

router.post('/:userId', isSupper, async function(req, res, next) {
  res.send(await articleRepo.addArticle(req.body, req.params.userId));
});

router.put('/', isSupper, async function(req, res, next) {
  res.send(await articleRepo.updateArticle(req.body))
});

router.get('/:id', async function(req, res, next) {
  await articleRepo.getArticle(req.params.id)
  .then(data => res.send(data));
});

router.get('/:id/comments', async function(req, res, next) {
  await articleRepo.getArticleComents(req.params.id)
  .then(data => res.send(data));
});

router.delete('/:id', isSupper, async function(req, res, next) {
  res.send(await articleRepo.deleteArticle(req.params.id))
});

module.exports = router;
