const router = require('express').Router();
const authorRoutes = require('./author-routes');
const questionRoutes = require('./question-routes');
const voteRoutes = require('./vote-routes');

router.use('/authors', authorRoutes);
router.use('/questions', questionRoutes);
router.use('/votes', voteRoutes);


module.exports = router;