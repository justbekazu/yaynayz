const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Question, Author, Vote } = require('../models');

router.get('/', withAuth, (req, res) => {
  Question.findAll({
    order: [['created_at', 'ASC']],
    where: {
      // use the ID from the session
      author_id: req.session.author_id
    },
    attributes: [
      'id',
      'title',
      'shortcode',
      'created_at',
    ],
    include: [
      {
        model: Vote,
        attributes: ['id', 'answer', 'created_at'],
      }
    ]
  })
    .then(dbQuestionData => {
      Author.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.session.author_id
        }
      })
      .then(author => {
      const questions = dbQuestionData.map(question => question.get({ plain: true }));
      res.render('dashboard', { questions, username:author.username, loggedIn: true });
      })      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Question.findByPk(req.params.id, {
    attributes: [
      'id',
      'title',
      'shortcode',
      'created_at',
    ]
  })
    .then(dbQuestionData => {
      if (dbQuestionData) {
        const question = dbQuestionData.get({ plain: true });
        
        res.render('edit-question', {
          question,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/new/', withAuth, (req, res) => {
  Question.findAll({
    where: {
      author_id: req.session.author_id
    },
    attributes: [
      'id',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Author,
        attributes: ['username']
      }
    ]
  })
    .then(dbQuestionData => {
      // serialize data before passing to template
      const questions = dbQuestionData.map(question => question.get({ plain: true }));
      res.render('new-question', { questions, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
