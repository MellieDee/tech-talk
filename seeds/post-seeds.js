const { Post } = require('../models');

const postData = [
  {
    title: 'Tech1',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 1
  },
  {
    title: 'Tech2',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 2
  },
  {
    title: 'Tech3',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 3
  },
  {
    title: 'Tech4',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 6
  },
  {
    title: 'Tech5',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 6
  },
  {
    title: 'Tech6',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 2
  },
  {
    title: 'Tech7.',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 3
  },
  {
    title: 'Tech8',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 3
  },
  {
    title: 'Tech9',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 2
  },
  {
    title: 'Tech10',
    post_url: 'https://en.wikipedia.org/wiki/Cat',
    user_id: 6
  }

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
