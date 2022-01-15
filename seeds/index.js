const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
// const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {

  await sequelize.sync({ force: false });
  console.log('------ Seq Synched --------');

  await seedUsers();
  console.log('-------- Users SEEDED ------');

  await seedPosts();
  console.log('------- Posts SEEDED -------');

  // await seedComments();
  // console.log('------- Comments SEEDED  -------');

  process.exit(0);
};

seedAll();
