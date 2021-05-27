const sequelize = require('../../config/connection');
const router = require('express').Router();
const { Question, Author, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  console.log('======================');
  Question.findAll({
    order: [['created_at', 'ASC']],
    attributes: [
      'id',
      'title',
      'shortcode',
      'created_at',
      'author_id'
    ]
   })
    .then(dbQuestionData => res.json(dbQuestionData)
    // here we do the 2 queries and intersect... in a new object...
    )
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Question.findOne({
    attributes: [
      'id',
      'title',
      'shortcode',
      'created_at',
      'author_id'
    ],
    include: [
      {
        model: Vote,
        attributes: ['id', 'answer', 'created_at', 'session_id']
      },
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
      res.json(dbQuestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/shortcode/:shortcode', (req, res) => {
  Question.findOne({
    attributes: [
      'id',
      'title',
      'shortcode',
      'created_at',
      'author_id'
    ],
    include: [
      {
        model: Vote,
        attributes: ['id', 'answer', 'created_at']
      },
    ],
    where: {
      shortcode: req.params.shortcode
    },
  })
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No Question found with this shortcode' });
        return;
      }
      res.json(dbQuestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => { // delete withAuth to test without session
  Question.create({
    title: req.body.title,
    author_id: req.session.author_id, // grab the author_id from the session
    // author_id: req.body.author_id, // uncomment to test without auth
    shortcode: req.body.shortcode
  })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => { // delete withAuth to test without session
  Question.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No Question found with this id' });
        return;
      }
      res.json(dbQuestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => { // delete withAuth to test without session
  Question.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbQuestionData => {
      if (!dbQuestionData) {
        res.status(404).json({ message: 'No Question found with this id' });
        return;
      }
      res.json(dbQuestionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;