const express = require("express");
const router = new express.Router();
const reviewController = require("../controllers/reviewController");
const utilities = require("../utilities/");
const reviewValidate = require("../utilities/review-validation");

router.post(
  "/add",
  utilities.checkJWTToken,
  reviewValidate.reviewRules(),
  reviewValidate.checkReviewData,
  utilities.handleErrors(reviewController.addReview)
);
router.get(
  "/edit/:review_id",
  utilities.checkJWTToken,
  utilities.handleErrors(reviewController.buildEditReviewView)
);
router.post(
  "/update",
  utilities.checkJWTToken,
  reviewValidate.reviewRules(),
  reviewValidate.checkReviewData,
  utilities.handleErrors(reviewController.updateReview)
);
router.post(
  "/delete",
  utilities.checkJWTToken,
  utilities.handleErrors(reviewController.deleteReview)
);

module.exports = router;
