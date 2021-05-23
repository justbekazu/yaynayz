const { Vote } = require('../models');

const VoteData = [{
        vote_text: "Yay",
        question_id: 1
    },
    {
        vote_text: "Nay",
        question_id: 2
    },
    {
        vote_text: "Yay",
        question_id: 3
    },
    {
        vote_text: "Nay",
        question_id: 4
    },
    {
        vote_text: "Yay",
        question_id: 5
    },
    {
        vote_text: "Yay",
        question_id: 6
    },
    {
        vote_text: "Nay",
        question_id: 7
    },
    {
        vote_text: "Yay",
        question_id: 8
    },
    {
        vote_text: "Nay",
        question_id: 9
    },
    {
        vote_text: "Yay",
        question_id: 10
    }
];

const seedVotes = () => Vote.bulkCreate(VoteData);

module.exports = seedVotes;