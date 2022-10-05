const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    postsId: {
        type: Number,
        required: true,
        unique: true
      },
      name: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        unique: true
      },
      date: {
        type: Date,
        default: Date.now,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      contents: {
        type: String,
      }
})

module.exports = mongoose.model("Post", postsSchema);