import path from 'path';
import express from 'express';
import routes from './controllers/index.js'; // Adjusted to match ES module syntax
import { sequelize } from './config/connection.js'; // Import sequelize as an object
import helpers from './utils/helpers.js'; // Assuming helpers is a default export
import exphbs from 'express-handlebars';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';

const hbs = exphbs.create({
    helpers
});

// Set up session store
const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // Check every 10 minutes
        expiration: 1000 * 60 * 30 // Expires after 30 minutes
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware setup
app.use(session(sess));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes from controllers
app.use(routes);

// Sync Sequelize models and start the server
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}!`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
