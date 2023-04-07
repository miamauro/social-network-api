const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json(error));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts", "friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID." })
          : res.json(user)
      )
      .catch((error) => res.status(500).json(error));
  },
  postNewUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error));
  },
};
