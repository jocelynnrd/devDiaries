// controllers/dashboardRoutes.js
import express from 'express';
import { Post, User } from '../models/index.js';
import withAuth from '../utils/auth.js';

const router = express.Router();

router.get('/', withAuth, async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ['username'] }]
        });

        const posts = userPosts.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;

