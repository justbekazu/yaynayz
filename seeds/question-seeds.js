const { Question } = require('../models');

const questionData = [{

    question: 'Should we test this product on the market?',
    author_id: 1

},
{
    question: 'Are the Power Rangers awesome?',
    author_id: 2
},
{
    question: 'Do you like pineapple on pizza?',
    author_id: 3
},
{
    question: 'Have you ever been to Mexico?',
    author_id: 4

},
{
    question: 'Have you ever been arrested?',
    author_id: 5
},
{
    question: 'Do you enjoy being outside?',
    author_id: 6
},
{
    question: 'Do you have any children?',
    author_id: 7
},
{
    question: 'Are you married?',
    author_id: 8

},
{
    question: 'Do you own a motorcycle?',
    author_id: 9
},
{
    question: 'Is this the best project you have ever seen in Bootcamp?',
    author_id: 10
}
];

const seedQuestions = () => Post.bulkCreate(questionData);

module.exports = seedQuestions;