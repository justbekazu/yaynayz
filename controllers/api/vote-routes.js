const router = require('express').Router();
const { Vote } = require('../../models');

router.get('/', (req, res) => {
  Vote.findAll({
  })
    .then(dbVoteData => res.json(dbVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // check the session
  if (req.session) {
    Vote.create({
      answer: req.body.answer,
      question_id: req.body.question_id,
      session_id: req.sessionID,
    })
      .then(dbVoteData => res.json(dbVoteData), console.log(req.sessionID))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;