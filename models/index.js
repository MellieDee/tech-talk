const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const { belongsTo } = require('./User');


//--------- User - Post Associations ------
// id in User =  user_id in Post
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});



module.exports = { User, Post, Comment };