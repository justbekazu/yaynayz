const { Author } = require('../models');

const authorData = [{
        username: 'Kate',
        password: 'kate'

    },
    {
        username: 'Tim',
        password: 'tim'
    },
    {
        username: 'Bill',
        password: 'bill'
    }
];

const seedAuthors = () => User.bulkCreate(authorData);

module.exports = seedAuthors;