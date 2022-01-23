const { Post } = require('../models');

const postData = [
  {
    title: 'Tech1',
    post_text: 'This is a a bunch of text.',
    user_id: 1
  },
  {
    title: 'Tech2',
    post_text: 'This is a a bunch of text.',
    user_id: 2
  },
  {
    title: 'Tech3',
    post_text: 'This is a a bunch of text.',
    user_id: 3
  },
  {
    title: 'Tech4',
    post_text: 'This is a a bunch of text.',
    user_id: 4
  },
  {
    title: 'Tech5',
    post_text: 'This is a a bunch of text.',
    user_id: 5
  },
  {
    title: 'Tech6',
    post_text: 'This is a a bunch of text.',
    user_id: 6
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
