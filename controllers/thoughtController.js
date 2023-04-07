const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((error) => res.status(500).json(error));
  },
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
  postNewThought(req, res) {
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
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID." })
          : res.json(thought)
      )
      .catch((error) => res.status(500).json(error));
  },
};
