const Review = require("../models/Review");

const addReview = async (req, res) => {
  try {
    const review = await Review.create({
      companyId: req.params.companyId,
      fullName: req.body.fullName,
      subject: req.body.subject,
      reviewText: req.body.reviewText,
      rating: req.body.rating
    });

    console.log("New Review Added:", review);
    res.json(review);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Review add failed" });
  }
};

const getReviews = async (req, res) => {
  const sort = req.query.sort || "latest";

  let sorting = { createdAt: -1 };
  if (sort === "high") sorting = { rating: -1 };
  if (sort === "low") sorting = { rating: 1 };

  const reviews = await Review.find({
    companyId: req.params.companyId
  }).sort(sorting);

  console.log(reviews);

  res.json(reviews);
};

const likeReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  review.likes++;
  await review.save();
  res.json(review);
};

module.exports = {
  addReview,
  getReviews,
  likeReview
};
