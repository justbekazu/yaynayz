const Author = require('./Author');
const Question = require('./Question');
const Vote = require('./Vote');

Author.hasMany(Question, {
    foreignKey: 'author_id'
});

Question.belongsTo(Author, {
    foreignKey: 'author_id',
    onDelete: "CASCADE"
});

Vote.belongsTo(Question, {
    foreignKey: 'question_id',
    onDelete: "CASCADE"
});

Author.hasMany(Question, {
    foreignKey: 'author_id',
});

Question.hasMany(Vote, {
    foreignKey: 'vote_id',
})
module.exports = { Author, Question, Vote };
