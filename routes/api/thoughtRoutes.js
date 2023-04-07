const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  postNewThought,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(postNewThought);

router.route("/:userId").get(getSingleThought);

module.exports = router;
