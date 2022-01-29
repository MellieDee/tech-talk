const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post } = require('../models');
const withAuth = require('../utils/auth');


// ----- GET all the LoggedIN User's POSTS Starts --------
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('-------------This is the DB route / ----------')
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
  })
    .then(data => {
      const postsArr = data.map(post => post.get({ plain: true }));
      res.render('dashboard', {
        postsArr,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect('login');
      // res.status(500).json(err)
    })
})
// ----- GET all the LoggedIN User's POSTS  Ends--------


//  ------------- Get ONE Post by ID   Ends -------------
router.get("/edit/:id", withAuth, (req, res) => {
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
//  ------------- Get ONE Post by ID   Ends -------------


module.exports = router