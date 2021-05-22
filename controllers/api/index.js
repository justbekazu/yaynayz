const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const questionRoutes = require('./question-routes');
const voteRoutes = require('./vote-routes');

router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/votes', voteRoutes);

module.exports = router;
