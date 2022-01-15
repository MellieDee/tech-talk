const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// get ALL Posts
router.get('/', (req, res) => {
  console.log(' ---------- Got Posts ---------');
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
    ],
    // include: [
    //   {
    //     model: Comment,
    //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
  })
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router