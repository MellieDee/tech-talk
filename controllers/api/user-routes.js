const router = require('express').Router();
const { User } = require('../../models');

// get ALL Users
router.get('/', (req, res) => {
  // Access User model and run .findAll() method)
  User.findAll()
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET ONE User
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with that ID' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// POST  CREATE NEW User
router.post('/', (req, res) => {
  // expects {username: 'name', email: 'name@gmail.com', password: '1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



router.post('/login', (req, res) => {
  // expects {email: 'name@gmail.com', password: '1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userData => {
    if (!userData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    // res.json({ user: userData });

    // Verify user
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password or eMail!' });
      return;
    }

    res.json({ user: userData, message: 'You are now logged in!' });

  });
})


// PUT UPDATE One User
router.put('/:id', (req, res) => {
  // if req.body has exact key/value pairs to match the model, use `req.body` instead
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(userData => {
      if (!userData[0]) {
        res.status(404).json({ message: 'No user found with that ID' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// DELETE ONE User
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with that ID' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




module.exports = router;