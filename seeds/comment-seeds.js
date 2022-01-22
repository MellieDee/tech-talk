const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'Nunc rhoncus dui vel sem.',
    user_id: 6,
    post_id: 1,
    "createdAt": "2022-01-20T06:01:35.000Z",
    "updatedAt": "2022-01-20T06:01:53.000Z"
  },
  {
    comment_text: 'Comment 2.',
    user_id: 1,
    post_id: 1,
    createdAt: "2022-01-20T06:01:34.000Z",
    updatedAt: "2022-01-20T06:01:43.000Z"
  },
  {
    comment_text: "Nunc rhoncus dui vel sem.",
    user_id: 6,
    post_id: 1,
    createdAt: "2022-01-20T06:01:25.000Z",
    updatedAt: "2022-01-20T06:01:25.000Z"
  },
  {
    comment_text: "Nunc rhoncus dui vel sem.",
    user_id: 6,
    post_id: 1,
    createdAt: "2022-01-20T06:01:25.000Z",
    updatedAt: "2022-01-20T06:01:25.000Z"
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
