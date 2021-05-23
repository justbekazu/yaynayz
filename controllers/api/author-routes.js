const router = require('express').Router();
const { Question, Author } = require("../../models");

// GET /api/Authors
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  Author.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbAuthorData => res.json(dbAuthorData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  Author.findOne({
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Question,
        attributes: ['id', 'title', 'shortcode', 'created_at']
      },
    ],
    where: {
      id: req.params.id
    }
  })
    .then(dbAuthorData => {
      if (!dbAuthorData) {
        res.status(404).json({ message: 'No Author found with this id' });
        return;
      }
      res.json(dbAuthorData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
  Author.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbAuthorData => {
    req.session.save(() => {
      req.session.author_id = dbAuthorData.id;
      req.session.username = dbAuthorData.username;
      req.session.loggedIn = true;
  
      res.json(dbAuthorData);
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  Author.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbAuthorData => {
    if (!dbAuthorData) {
      res.status(400).json({ message: 'Username not found!' });
      return;
    }
    
    // Verify user
    const validPassword = dbAuthorData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.author_id = dbAuthorData.id;
      req.session.username = dbAuthorData.username;
      req.session.loggedIn = true;

      res.json({ author: dbAuthorData, message: 'You are now logged in!' });
    });
  });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
  // pass in req.body instead to only update what's passed through
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Author.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbAuthorData => {
      if (!dbAuthorData[0]) {
        res.status(404).json({ message: 'No Author found with this id' });
        return;
      }
      res.json(dbAuthorData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  Author.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbAuthorData => {
      if (!dbAuthorData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbAuthorData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;