const Listing = require('../models/listing.js');
const ExpressError = require("../utils/ExpressError.js");

module.exports.index=async (req, res) => {
  const listings = await Listing.find({});
  res.render('listings/index', { allListings: listings });
}

module.exports.renderNewForm=(req, res) => {
  res.render('listings/new.ejs');
}

module.exports.showListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: { path: "author" }
        });

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
}

module.exports.createListing=async (req, res) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(msg, 400);
  }
  const newListing = new Listing(req.body.listing);
newListing.owner = req.user._id;
await newListing.save();
req.flash("success", "New Listing Created!");
res.redirect(`/listings/${newListing._id}`);
}

module.exports.renderEditForm=async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }
  res.render('listings/edit', { listing });
}


module.exports.updateListing=async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${updatedListing._id}`);
}

module.exports.destroyListing=async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted");
  res.redirect('/listings');
}