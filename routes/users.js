var express = require('express');
var router = express.Router();
const usersRepo = require('../respositories/users')
const isSupper  = require('./auth')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  await usersRepo.getUsers(req.query.offset, req.query.limit)
  .then(data => res.send(data));
});

router.post('/', isSupper, async function(req, res, next) {
  res.send(await usersRepo.addUser(req.body));
});

router.put('/', isSupper, async function(req, res, next) {
  res.send(await usersRepo.updateUser(req.body))
});

router.get('/:id', async function(req, res, next) {
  await usersRepo.getUser(req.params.id)
  .then(data => res.send(data));
});

router.get('/:id/articles', async function(req, res, next) {
  res.send(await usersRepo.getUserArticls(req.params.id))
});

router.delete('/:id', isSupper, async function(req, res, next) {
  res.send(await usersRepo.deleteUser(req.params.id))
});

module.exports = router;
