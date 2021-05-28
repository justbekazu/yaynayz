const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

var expirationCookie = 600000 // 60000 is 1 minute
// there is an additional SetInterval function in script.js to send user to login

const sess = {
  secret: 'Super secret secret',
  rolling: true, // Force cookie to be set on every response, it will reset expiration to maxAge.
  cookie: {
    expires: new Date(Date.now() + expirationCookie),
    maxAge: expirationCookie
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));
// turn on routes
app.use(routes);

// turn on connection to db and server
// remember to turn force to false or you will keep deleting the DB content
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});