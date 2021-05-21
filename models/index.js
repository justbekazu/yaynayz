const Author = require('./Author');
const Question = require('./Question');
const Vote = require('./Comment');

Author.hasMany(Question, {
    foreignKey: 'user_id'
});
Question.belongsTo(Author, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Vote.belongsTo(Question, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

Author.hasMany(Vote, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Question.hasMany(Vote, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})
module.exports = { Author, Question, Vote };
