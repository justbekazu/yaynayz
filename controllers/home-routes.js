const router = require('express').Router();
const sequelize = require('../config/connection');
const { Question, Author, Vote } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
  Question.findAll({
    attributes: [
      'id',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Vote,
        attributes: ['id', 'vote_answer', 'question_id', 'created_at'],
        include: {
          model: Author,
          attributes: ['username']
        }
      },
      {
        model: Author,
        attributes: ['username']
      }
    ]
  })
    .then(dbQuestionData => {
      // pass a single post object into the homepage template
      console.log(dbQuestionData[0]);
      const questions = dbQuestionData.map(question => question.get({ plain: true }));
      res.render('homepage', {
        questions,
        loggedIn: req.session.loggedIn
      });
      })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Vote,
        attributes: ['id', 'vote_answer', 'question_id', 'created_at'],
        include: {
          model: Author,
          attributes: ['username']
        }
      },
      {
        model: Author,
        attributes: ['username']
      }
    ]
  })
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No Question found with this id' });
        return;
      }

      // serialize the data
      const question = dbQuestionData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        question,
        loggedIn: req.session.loggedIn
      });
    })
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