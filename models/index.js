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

// Vote.belongsTo(Question, {
//     foreignKey: 'question_id',
//     onDelete: "CASCADE"
// });

Question.hasMany(Vote, {
    foreignKey: 'question_id',
})

Vote.belongsTo(Question,{
    foreignKey: 'question_id',
    onDelete: "CASCADE"
});

module.exports = { Author, Question, Vote };
