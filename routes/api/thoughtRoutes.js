const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  postNewThought,
  updateThought, deleteThought
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(postNewThought);

router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;
