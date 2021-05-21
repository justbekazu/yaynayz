const Author = require('./Author');
const Question = require('./Question');
const Vote = require('./Vote');

Author.hasMany(Question, {
    foreignKey: 'username'
});
Question.belongsTo(Author, {
    foreignKey: 'username',
    onDelete: "cascade"
});

Vote.belongsTo(Author, {
    foreignKey: 'username',
    onDelete: "cascade"
});

Vote.belongsTo(Question, {
    foreignKey: 'question_id',
    onDelete: "cascade"
});

Author.hasMany(Vote, {
    foreignKey: 'username',
    onDelete: "cascade"
});

Question.hasMany(Vote, {
    foreignKey: 'vote_id',
    onDelete: "cascade"
})
module.exports = { Author, Question, Vote };
