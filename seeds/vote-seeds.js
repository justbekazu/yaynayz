const { Vote } = require('../models');

const VoteData = [{
        vote_text: "Yay, Nay.",
        user_id: 1,
        post_id: 1
    },
    {
        vote_text: "Yay, Nay.",
        user_id: 2,
        post_id: 2
    },
    {
        vote_text: "Yay, Nay.",
        user_id: 3,
        post_id: 3
    }
];

const seedVotes = () => Vote.bulkCreate(VoteData);

module.exports = seedVotes;