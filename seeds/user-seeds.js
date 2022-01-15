const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    username: 'Alan',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123A'
  },
  {
    username: 'Betty',
    email: 'rmebes1@sogou.com',
    password: 'password123B'
  },
  {
    username: 'Carl',
    email: 'cstoneman2@last.fm',
    password: 'password123C'
  },
  {
    username: 'Donna',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123D'
  },
  {
    username: 'Erica',
    email: 'gmidgley4@weather.com',
    password: 'password123E'
  },
  {
    username: 'Frank',
    email: 'larnout5@imdb.com',
    password: 'password123F'
  }
];

// const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
