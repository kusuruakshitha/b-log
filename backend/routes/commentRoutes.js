const express = require('express');
const {
  createComment,
  deleteComment,
  getCommentsByPost,
  updateComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/post/:postId').get(getCommentsByPost).post(protect, createComment);
router.route('/:id').put(protect, updateComment).delete(protect, deleteComment);

module.exports = router;
