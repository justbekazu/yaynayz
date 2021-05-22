//CRD
const router = require('express').Router();
const { Question } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Question.findAll()
      .then(dbQuestionData => res.json(dbQuestionData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Question.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'shortcode',
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
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
    Question.create({
        question_text: req.body.question_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
        .then(dbQuestionData => res.json(dbQuestionData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Question.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbQuestionData => {
        if (!dbQuestionData) {
          res.status(404).json({ message: 'No question found!' });
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
