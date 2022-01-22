const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//--------- User - Post Associations ------
// id in User =  user_id in Post
User.hasMany(Post, {
  foreignKey: 'user_id'
  // fk = user_id column in Post
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