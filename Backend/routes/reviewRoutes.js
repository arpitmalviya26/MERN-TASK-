const express = require("express");
const {
  addReview,
  getReviews,
  likeReview
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/:companyId", addReview);
router.get("/:companyId", getReviews);
router.put("/:id/like", likeReview);

module.exports = router;
