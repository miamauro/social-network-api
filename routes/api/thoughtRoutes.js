const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(addThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);

// router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
