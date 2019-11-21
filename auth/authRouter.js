const router = require('express').Router()
const Users = require('./auth-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
  let user = req.body;
  const hash = await bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(savedUser => {
      res.status(201).json({username: savedUser.username, email: savedUser.email});
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({Error: "There was a problem registering the account."});
    });
});

router.post('/login', (req, res) => {
  let { username, password, email } = req.body;

  if (username){
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username)
        res.status(200).json({
          token,
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({Error: "There was a problem logging in."});
    });
  } else {
    Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username)
        const id = user.id
        res.status(200).json({
          token,
          message: `Welcome ${user.username}.`,
          user_id: id
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({Error: "There was a problem logging in."});
    });
  }
});

function getJwtToken (username) {
  const payload = {
    username,
  }

  const secret = process.env.JWT_SECRET || 'Have you ever put butter on a poptart?'

  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secret, options)
}


module.exports = router