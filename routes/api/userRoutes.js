const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(addUser);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// router.route("/:userId/friends/:friendId");

module.exports = router;
