const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    // Default to current timestamp
    // Use a getter method to format the timestamp on query
  },
  username: {
    // The user that created this thought
    // type: String,
    // required: true
  },
  reactions: [reactionSchema],
});

// Create a virtual called reactionCount that retrieves the lengt of the thought's reactions array field on query.

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
