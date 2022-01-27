const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Get ALL Posts
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_text',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// get ONE Post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },

    attributes: ['id', 'post_text', 'title', 'created_at'],
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
  })//Promise that captures the response from the database call.

    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Cannot find that post right  now.' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// CREATE a Post
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id
  })
    // //   {
    // //     model: Comment,
    // //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    // //     include: {
    // //       model: User,
    // //       attributes: ['username']
    // //     }
    // //   },
    // {
    //   model: User,
    //     attributes: ['username']
    // }
    //   ]
    //Promise that captures the response from the database call.
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




//UPDATE a post
// used req.param to find the post
//used req.body.title value to replace the title of the post
//In response, we sent back data that has been modified and stored in the database (since no req.body declared can change all)
router.put('/:id', (req, res) => {
  Post.update(
    // {
    //   title: req.body.title
    // },
    {
      where: {
        id: req.params.id
      }
    }
  )
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



// DELETE One Post
router.delete('/:id', (req, res) => {
  Post.destroy({
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

module.exports = router