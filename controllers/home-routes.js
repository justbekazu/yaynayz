const router = require('express').Router();
const sequelize = require('../config/connection'); // needed only if a literal (line 15ish) is required
const { Question, Author, Vote } = require('../models');

router.get('/', (req, res) => {
  //console.log(req.session);
  Question.findAll({
    order: [['created_at', 'ASC']],
    attributes: [
      'id',
      'title',
      'shortcode',
      'created_at',
      'author_id',
    ],
    include: [
      {
        model: Author,
        attributes: ['username']
      }
    ]
  })
    .then(dbQuestionData => {
      // pass a single post object into the homepage template
      //console.log(dbQuestionData[0]);
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

router.get('/question/:id', (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'shortcode',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE question_id = question.id AND vote.answer = true)'),'yay'],
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE question_id = question.id AND vote.answer = false)'),'nay'],
    ],
    include: [
      {
        model: Vote,
        attributes: ['id', 'answer', 'created_at']
      },
      {
        model: Author,
        attributes: ['username']
      }
    ],
    where: {
      id: req.params.id
    },
  })
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No Question found with this id' });
        return;
      }

      // serialize the data
      const question = dbQuestionData.get({ plain: true });

      // pass data to template
      res.render('single-question', {
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