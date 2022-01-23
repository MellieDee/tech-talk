const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');
// const withAuth = require('../utils/auth');


// GET all the LoggedIN User's POSTS
router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    where: {
      user_id: req.session.user_id
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
        attributes: [['id', 'comment_id'], 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      },
    ]
  })
    .then(data => {
      const posts = data.map(post => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err)
        ;
      res.status(500).json(err)
    })
})

module.exports = router