const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../utils/multer');

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPost);
router.post('/', protect, adminOnly, upload.single('image'), postsController.createPost);
router.put('/:id', protect, adminOnly, upload.single('image'), postsController.updatePost);
router.delete('/:id', protect, adminOnly, postsController.deletePost);

router.post('/:id/like', postsController.likePost);
router.post('/:id/comment', postsController.commentPost);
router.delete('/:id/comment/:commentId', postsController.deleteComment);

module.exports = router;
