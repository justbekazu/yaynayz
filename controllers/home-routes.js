const router = require('express').Router();
const sequelize = require('../config/connection');
const { Question, Author, Vote } = require('../models');


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

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;