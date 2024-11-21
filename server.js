// Import dependencies
import express from 'express';
import session from 'express-session';
import SequelizeStoreInit from 'connect-session-sequelize';
import exphbs from 'express-handlebars';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Sequelize connection and models
import { sequelize } from './models/index.js';

// Import routes
import homeRoutes from './controllers/homeRoutes.js';
import userRoutes from './controllers/routes/userRoutes.js';
import postRoutes from './controllers/routes/postRoutes.js';
import dashboardRoutes from './controllers/dashboardRoutes.js';
import commentRoutes from './controllers/routes/commentRoutes.js';

// Initialize dotenv
dotenv.config();

// Initialize app and port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up session store
const SequelizeStore = SequelizeStoreInit(session.Store);
const sess = {
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};
app.use(session(sess));

// Set up Handlebars.js as the template engine
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing and static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Resolve the path to "public" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', homeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/dashboard', dashboardRoutes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
