const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts.
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((error) => res.status(500).json(error));
  },
  // Get a single thought.
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : res.json(thought)
      )
      .catch((error) => res.status(500).json(error));
  },
  // Add a thought.
  addThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((thought) => res.json(thought))
      .catch((error) => res.status(500).json(error));
  },
  // Update a thought by ID.
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID." })
          : res.json({ message: "Thought has been updated." })
      )
      .catch((error) => res.status(500).json(error));
  },
  // Delete a thought by ID.
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID." })
          : res.json({ message: "Thought has been deleted." })
      )
      .catch((error) => res.status(500).json(error));
  },
  // Add a reaction to a thought by ID.
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID." })
          : res.json({ message: "A reaction has been added." })
      )
      .catch((error) => res.status(500).json(error));
  },
  // Delete a reaction by ID.
  // deleteReaction(req, res) {

  // }
};
