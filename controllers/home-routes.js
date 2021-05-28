const router = require('express').Router();
const sequelize = require('../config/connection'); // needed only if a literal (line 15ish) is required
const { Question, Author, Vote } = require('../models');

router.get('/', (req, res) => {
  Question.findAll({
    order: [['created_at', 'ASC']],
    attributes: [
      'id',
      'title',
      'shortcode',
      'created_at',
      'author_id',
      [sequelize.literal(`(SELECT JSON_ARRAYAGG(question_id) FROM vote WHERE session_id = '${req.sessionID}')`),'user_voted'],
    ],
    include: [
      {
        model: Author,
        attributes: ['username']
      }
    ]
  })
    .then(dbQuestionData => {
      const questions = dbQuestionData.map(question => {
        question = question.get({ plain: true });
        question.hasVoted = question.user_voted.includes(question.id);
        return question;
      });
      res.set('Cache-Control', 'no-store');
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
        attributes: ['id', 'answer', 'created_at', 'session_id']
      },
      {
        model: Author,
        attributes: ['username']
      }
    ],
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

router.get('/shortcode/:id', (req, res) => {
  Question.findAll({
    where: {
      shortcode: req.params.id
    },
    attributes: [
      'id',
      'title',
      'shortcode',
      'created_at',
      'author_id',
      [sequelize.literal(`(SELECT JSON_ARRAYAGG(question_id) FROM vote WHERE session_id = '${req.sessionID}')`),'user_voted'],
    ],
    include: [
      {
        model: Author,
        attributes: ['username']
      }
    ]
  })
  .then(dbQuestionData => {
    if (dbQuestionData=="") {
      res.render('empty', {});
      return;
    }
    const questions = dbQuestionData.map(question => {
      question = question.get({ plain: true });
      question.hasVoted = question.user_voted.includes(question.id);
      return question;
    });
    res.set('Cache-Control', 'no-store');
    res.render('shortcode', {
      questions,
      loggedIn: req.session.loggedIn
    });
    })
  .catch(err => {
    console.log(err);
    res.render('empty', {});
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