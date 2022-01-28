const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');


// ----- GET all the LoggedIN User's POSTS --------
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
      const postsArr = data.map(post => post.get({ plain: true }));
      res.render('dashboard', {
        postsArr,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err)
        ;
      res.status(500).json(err)
    })
})

// ------------- Get ONE Post by ID  Starts ------------
router.get('/edit/:id', (req, res) => {
  Post.findByPk(
    // where: {
    //   id: req.params.id
    // },
    req.params.id

    // attributes: ['id', 'post_text', 'title', 'created_at'],
    // include: [
    //   {
    //     model: Comment,
    //     attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],

    //     include: {
    //       model: User,
    //       attributes: ['username']
    //     }
    //   },
    //   {
    //     model: User,
    //     attributes: ['username']
    //   }
    // ]
  )//Promise that captures the response from the database call.
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'Could not find that post! Try again.' });
        return;
      }
      console.log(data)

      const post = data.get({ plain: true });

      res.render('edit-post', {
        post
        // loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err)
        ;
      res.status(500).json(err)
    })
});
// ------------- Get ONE Post by ID   Ends -------------


//  --------------- UPDATE a post Starts -------------
// used req.param to find the post
//used req.body.title value to replace the title of the post
//In response, we sent back data that has been modified and stored in the database (since no req.body declared can change all)
router.put('/edit/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Cannot find that post! Try again.' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// -------------- UPDATE a Post Ends ---------------

module.exports = router