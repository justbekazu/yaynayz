const seedAuthors = require('./author-seeds');
const seedQuestions = require('./question-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: false });
    await seedAuthors();
    await seedQuestions();
    await seedVotes();
    process.exit(0);
};

seedAll();