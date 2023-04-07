const { User, Thought } = require("../models");

module.exports = {
  // Get all users.
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json(error));
  },
  // Get a single user.
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
  // Add a user.
  addUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error));
  },
  // Update a user by ID.
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID." })
          : res.json({ message: "User has been updated." })
      )
      .catch((error) => res.status(500).json(error));
  },
  // Delete a user by ID.
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID." })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts have been deleted." })
      )

      .catch((error) => res.status(500).json(error));
  },
  // Add a friend to a user by ID.
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID." })
          : res.json({ message: "A friend has been added." })
      )
      .catch((error) => res.status(500).json(error));
  },
  // Delete a friend by ID.
  // deleteFriend() {
  //   User.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $pull: { friends: { friendId: req.params.friendId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: "No user with this ID." })
  //         : res.json({ message: "Friend has been deleted." })
  //     )
  //     .catch((error) => res.status(500).json(error));
  // },
};
