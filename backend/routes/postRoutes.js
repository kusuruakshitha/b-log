const express = require('express');
const {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  toggleLike,
  updatePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);
router.route('/:id/like').patch(protect, toggleLike);
router.route('/:id').get(getPostById).put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
