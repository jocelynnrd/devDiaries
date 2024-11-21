import { Router } from 'express';
import { Comment, User } from '../../models/index.js';
import { withAuth } from '../../utils/auth.js'; 


const router = Router();

// Get all comments for a specific post
router.get('/:postId', async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      where: { post_id: req.params.postId },
      include: [{ model: User, attributes: ['username'] }]
    });
    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      post_id: req.body.postId,
      user_id: req.session.user_id
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id, user_id: req.session.user_id }
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found or no permission to delete.' });
      return;
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

