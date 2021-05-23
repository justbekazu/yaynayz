const { Author } = require('../models');

const authorData = [{
        username: 'kate@email.com',
        password: 'kate',
        author_id: 1,

    },
    {
        username: 'Tim@gmail.com',
        password: 'tim',
        author_id: 2
    },
    {
        username: 'Bill@yahoo.com',
        password: 'bill',
        author_id: 3
    }
];

const seedAuthors = () => User.bulkCreate(authorData);

module.exports = seedAuthors;