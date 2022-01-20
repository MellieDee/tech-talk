const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//--------- User - Post Associations ------
// id in User =  user_id in Post
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});


module.exports = { User, Post, Comment };