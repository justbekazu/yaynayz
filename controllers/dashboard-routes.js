const router = require('express').Router();
const sequelize = require('../config/connection');
const { Question, Author, Vote } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', (req, res) => {
    Vote.findOne({
        where: {
            id: req.params.id
            },
        include: [
            {
                model: Question,
                attributes: ['id', 'title']
            },
            ]
})
      .then(dbVoteData => res.json(dbVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;