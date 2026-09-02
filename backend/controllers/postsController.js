const mongoose = require('mongoose');
const Post = require('../models/Post');
const cloudinary = require('../config/cloudinary');

exports.getPosts = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.category && req.query.category !== 'all') {
      query.category = req.query.category;
    }
    const posts = await Post.find(query).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.views = (post.views || 0) + 1;
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, category = 'General', tags = [], isFeatured = false } = req.body;
    let imageUrl = '';
    let parsedTags = tags;
    if (typeof tags === 'string' && tags) {
      parsedTags = tags.startsWith('[') ? JSON.parse(tags) : tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    }

    if (req.file && req.file.buffer) {
      // Use Cloudinary when configured
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        const streamifier = require('streamifier');
        const stream = cloudinary.uploader.upload_stream({ folder: 'odaa_posts' }, async (error, result) => {
          if (error) return next(error);
          try {
            const post = await Post.create({
              title,
              content,
              category,
              tags: parsedTags,
              isFeatured: isFeatured === 'true' || isFeatured === true,
              imageUrl: result.secure_url,
              author: req.user.email,
            });
            res.status(201).json(post);
          } catch (err) { next(err); }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
        return;
      }

      // Local fallback: write to uploads directory
      const fs = require('fs');
      const path = require('path');
      const filename = `${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;
      const uploadPath = path.join(__dirname, '..', 'uploads', filename);
      fs.writeFileSync(uploadPath, req.file.buffer);
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    }

    const post = await Post.create({
      title,
      content,
      category,
      tags: parsedTags,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      imageUrl,
      author: req.user.email,
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, category, tags, isFeatured } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    let parsedTags = tags;
    if (typeof tags === 'string' && tags) {
      parsedTags = tags.startsWith('[') ? JSON.parse(tags) : tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    }

    if (req.file && req.file.buffer) {
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        const streamifier = require('streamifier');
        const stream = cloudinary.uploader.upload_stream({ folder: 'odaa_posts' }, async (error, result) => {
          if (error) return next(error);
          post.title = title || post.title;
          post.content = content || post.content;
          post.category = category || post.category;
          post.tags = parsedTags || post.tags;
          post.isFeatured = isFeatured === 'true' || isFeatured === true || post.isFeatured;
          post.imageUrl = result.secure_url;
          await post.save();
          res.json(post);
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
        return;
      }

      const fs = require('fs');
      const path = require('path');
      const filename = `${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;
      const uploadPath = path.join(__dirname, '..', 'uploads', filename);
      fs.writeFileSync(uploadPath, req.file.buffer);
      post.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.tags = parsedTags || post.tags;
    post.isFeatured = isFeatured === 'true' || isFeatured === true || post.isFeatured;
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (err) {
    next(err);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.body?.userId || req.headers['x-client-id'] || 'anon';
    const idx = post.likes.indexOf(userId);
    const liked = idx === -1;

    if (liked) {
      post.likes.push(userId);
    } else {
      post.likes.splice(idx, 1);
    }

    await post.save();
    res.json({ likes: post.likes.length, liked });
  } catch (err) {
    next(err);
  }
};

exports.commentPost = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const name = String(req.body?.name || 'Anonymous').trim();
    const text = String(req.body?.text || '').trim();

    if (!name || !text) {
      return res.status(400).json({ message: 'Name and comment are required' });
    }

    post.comments.push({ name, text, createdAt: new Date() });
    await post.save();

    const addedComment = post.comments[post.comments.length - 1].toObject ? post.comments[post.comments.length - 1].toObject() : post.comments[post.comments.length - 1];
    res.status(201).json(addedComment);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments = post.comments.filter(c => c._id.toString() !== req.params.commentId);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    next(err);
  }
};
