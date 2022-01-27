const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');


//  Render HOMEPAGE at Home Path '/' 
// put posts on it
router.get('/', (req, res) => {
  // console.log(req.session);
  Post.findAll({
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(data => {
      // pass a single post object into the homepage template

      // loop over & map ea Sequelize obj into a serialized version of itself, saving the results in a new posts array
      const posts = data.map(post => post.get({ plain: true }))


      // add posts[] to an obj THEN pass to render lets us add things later to template
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET SINGLE Post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Could not find that post! Try again.' });
        return;
      }

      const post = data.get({ plain: true });

      res.render('single-post', {
        post,
        // loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




// Render LOGIN page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return;
  }
  res.render('login');
});



module.exports = router;



