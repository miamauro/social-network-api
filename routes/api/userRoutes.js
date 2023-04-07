const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  postNewUser,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(postNewUser);

router.route("/:userId").get(getSingleUser);

module.exports = router;
