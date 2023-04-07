const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  postNewUser,
  updateUser,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(postNewUser);

router.route("/:userId").get(getSingleUser).put(updateUser);

module.exports = router;
