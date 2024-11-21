const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all posts by the logged-in user for the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    // Serialize data so the template can read it
    const posts = userPosts.map(post => post.get({ plain: true }));

    // Render the dashboard page with user's posts
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the form to create a new post
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    logged_in: req.session.logged_in
  });
});

// Route to render the form to edit an existing post by its ID
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    // Check if the post belongs to the logged-in user
    if (postData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You do not have permission to edit this post' });
      return;
    }

    // Serialize data so the template can read it
    const post = postData.get({ plain: true });

    // Render the edit post page with the post data
    res.render('edit-post', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

