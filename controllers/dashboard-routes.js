const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');


// ----- GET all the LoggedIN User's POSTS --------
router.get('/', (req, res) => {
  console.log(req.session);
  console.log('-------------This is the DB route / ----------')
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


router.get("/edit/:id", (req, res) => {
  console.log('This is the DB route edit/id')
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// // ------------- Get ONE Post by ID   Ends -------------


//  --------------- UPDATE a post Starts -------------
// used req.param to find the post
//used req.body.title value to replace the title of the post
//In response, we sent back data that has been modified and stored in the database (since no req.body declared can change all)
// router.put('/edit/:id', (req, res) => {
//   Post.update(
//     {
//       title: req.body.title,
//       post_text: req.body.post_text
//     },
//     {
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'Cannot find that post! Try again.' });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// // -------------- UPDATE a Post Ends ---------------

module.exports = router