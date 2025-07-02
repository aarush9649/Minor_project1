  const Listing=require('../models/listing.js')
    const Review = require('../models/review');

    module.exports.createReview=async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview); // assuming reviews is an ObjectId array

    await newReview.save();
    await listing.save();
    req.flash("success","New Review created")

   res.redirect(`/listings/${listing._id}`)
  } catch (err) {
    console.error("Error while saving review:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports.destroyReview=async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review deleted")
  res.redirect(`/listings/${id}`);
}