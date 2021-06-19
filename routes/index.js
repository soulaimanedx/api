var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { User } = require('../models');

router.use(bodyParser.json());
const accessTokenSecret = 'testcode';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
                            where:{
                              username: username,
                              password: password
                            }
                        })
  if (!user) res.send('Username or password incorrect');

  // Generate an access token
  const accessToken = jwt.sign({ id: user.id, username: user.username,  role: user.role }, accessTokenSecret);
  res.json({
      accessToken
  });

});

module.exports = router;
