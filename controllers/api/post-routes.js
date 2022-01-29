const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// ----------  Get ALL Posts Starts  ----------------
router.get('/', (req, res) => {

  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_text',
      'created_at',
    ],
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// -----------  Get ALL Posts Ends  -----------------



// ------------- Get ONE Post by ID  Starts ------------
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
        order: ['created_at', 'DESC'],
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
// ------------- Get ONE Post by ID   Ends -------------


// -------------- CREATE a Post  Starts ---------------
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id
  })
    //Promise that captures the response from the database call.
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// ------------------  CREATE a POST Ends  --------------



//  --------------- UPDATE a post Starts -------------
// used req.param to find the post
//used req.body.title value to replace the title of the post
//In response, we sent back data that has been modified and stored in the database (since no req.body declared can change all)
router.put('/:id', withAuth, (req, res) => {
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


// ----------  DELETE One Post Starts -------------
router.delete('/:id', withAuth, (req, res) => {
  console.log('============DELETE ROUTE==========');
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
// -------------- DELETE a Post Ends ---------------



module.exports = router