const router = require('express').Router();
const { User, Comment } = require('../../models');

// get ALL Users
router.get('/', (req, res) => {
  // Access User model and run .findAll() method)

  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET ONE User
router.get('/:id', (req, res) => {
  // Passing 'where' argumant obj
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      }
    ]
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'Cannot find that user!' });
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


// LOGIN Route
router.post('/login', (req, res) => {
  // expects {email: 'name@gmail.com', password: '1234'}
  // sent the email & plaintext password in JSON to the application in the body of the request

  User.findOne({
    where: {
      email: req.body.email
    }
    // Query Db for user record that matches email enterd by user
    //then assigned it to req.body.email

  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'Cannot find that user!' });
      // if email is in db, this instance of a user must be returned in a Promise so we can proceed with the password verification process.
      return;
    }

    // res.json({ user: userData });

    // Verify user
    //userData from user.findOne call
    // Call checkPW on userData {} - from bycrypt npm page Check PW Section
    //pass plaintext PW (found as prop on userData Obj = userData.password) as arg in checkPW()
    //checkPW() defined in User Model object{} (not init)

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password or eMail!' });
      return; //returns T or F & T or F is sotred on validPassword var
    }

    res.json({ user: dbUserData, message: 'You are now logged in!' });

  });
})


// PUT UPDATE One User
router.put('/:id', (req, res) => {
  // if req.body has exact key/value pairs to match the model, use `req.body` instead
  User.update(req.body, {
    // as per Seq Docs need indH = true
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