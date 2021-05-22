const { Question } = require('../models');

const questionData = [{
        title: 'Lorem Ipsum I',
        content: 'This is a question?',
        user_id: 1

    },
    {
        title: 'Lorem Ipsum II',
        content: 'This is a question?',
        user_id: 2
    },
    {
        title: 'Lorem Ipsum III',
        content: 'This is a question?',
        user_id: 3
    }
];

const seedQuestions = () => Post.bulkCreate(questionData);

module.exports = seedQuestions;