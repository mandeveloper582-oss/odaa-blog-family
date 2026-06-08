const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: String,
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  author: { type: String },
  likes: [{ type: String }],
  comments: [CommentSchema],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
