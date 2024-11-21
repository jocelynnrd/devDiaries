import express from 'express';
import { Post } from '../models/index.js'; 
import { User } from '../models/index.js';
import withAuth from '../utils/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;


