const mongoose = require("mongoose");

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['paragraph', 'heading', 'image', 'list'],
    required: true,
  },
  content: {
    type: String, // For paragraphs, headings, and image URLs
    required: function() {
      return this.type !== 'list';
    },
  },
  level: {
    type: Number, // For heading levels (h1, h2, etc.)
    required: function() {
      return this.type === 'heading';
    },
  },
  items: {
    type: [String], // For list items
    required: function() {
      return this.type === 'list';
    },
  },
});

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [contentBlockSchema], // Array of content blocks
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  display: {
    type: String,
    default: "public",
  },
});

module.exports = mongoose.model("Posts", postsSchema);
