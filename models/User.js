const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  },
  // thoughts:
  // friends:
  // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
});

const User = model("user", userSchema);

module.exports = User;
