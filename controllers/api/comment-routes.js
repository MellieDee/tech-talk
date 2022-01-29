const router = require('express').Router();
const { Comment } = require('../../models');
//const withAuth = require('../../utils/auth');


// ----------- Get ALL Comments Starts -----------
// not used right now - getting comments through Post Routes
// router.get('/', (req, res) => {
//   Comment.findAll()
//     .then(commentData => res.json(commentData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// // ----------- Get ALL Comments Ends-----------


// // -------------Get ONE Comment Starts --------
// not used right now - not editing comments
// router.get('/:id', (req, res) => {
//   Comment.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(commentData => res.json(commentData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// // ----------- Get ONE Comments Ends-----------


// ------------CREATE a Comment Starts --------
router.post('/', (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});
// ----------- CREATE ONE Comments Ends-----------


// ------------ PUT UPDATE One Comment Starts---------
// not used right now - not editing comments
// router.put('/:id', (req, res) => {
//   // if req.body has exact key/value pairs to match the model, use `req.body` instead
//   Comment.update(req.body, {
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(userData => {
//       if (!userData[0]) {
//         res.status(404).json({ message: 'No user found with that ID' });
//         return;
//       }
//       res.json(userData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// ------------ PUT UPDATE One Comment Ends---------



// -------------- DELETE a Comment Starts ---------
// not used right now - not editing comments
// router.delete('/:id', (req, res) => {
//   Comment.destroy({
//     where: {
//       id: req.params.id
//     }

//   })
//     .then(dbCommentData => res.json(dbCommentData))
//     .catch(err => {
//       console.lor(err);
//       res.status(400).json(err);
//     })
// });
// -------------- DELETE a Comment Ends ---------




module.exports = router;