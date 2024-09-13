const mongoose = require("mongoose");

const bookSchema1 = new mongoose.Schema({
  bookName: String,
  author: String,
  genre: String,
});

const Books1 = mongoose.model("Books1", bookSchema1);

module.exports = { Books1 };
// "src": "./index.js",
//"buildCommand": "next build",
//"cleanUrls": true
