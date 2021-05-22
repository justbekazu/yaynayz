//CRD
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Question, Author, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Vote.findAll({
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

router.post('/',(req, res) => {
Vote.create({
    user_id: req.session.user_id,
    })
    .then(dbVoteData => res.json(dbVoteData))
    .catch(err => {
    console.log(err);
    res.status(400).json(err);
    });
});