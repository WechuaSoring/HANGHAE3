const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    postsId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
        unique: true
      },
      date: {
        type: Date,
        default: Date.now,
        required: true
      },
      contents: {
        type: String,
      }
})

module.exports = mongoose.model("Comments", commentsSchema);