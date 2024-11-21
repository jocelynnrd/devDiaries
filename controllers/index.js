import { Router } from 'express';
import apiRoutes from './api';
import homeRoutes from './homeRoutes';
import dashboardRoutes from './dashboardRoutes';

const router = Router();

// Set up route paths
router.use('/', homeRoutes);             // Routes for the homepage and public pages
router.use('/dashboard', dashboardRoutes); // Routes for the user's dashboard
router.use('/api', apiRoutes);             // API routes for user, post, and comment actions

// Handle 404 - Route not found
router.use((req, res) => {
  res.status(404).end();
});

export default router;

