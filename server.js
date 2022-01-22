const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to prep req.body & serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// turn on routes
const routes = require('./controllers');
app.use(routes);

// turn on connection to db and server
// //then turn on the server (true = overwrite)
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
