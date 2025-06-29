const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { listingSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');

const listingController=require("../controllers/listings.js")
// INDEX - Show all listings
router.get('/', 
  wrapAsync(listingController.index));

// NEW - Show form to create new listing
router.get('/new', isLoggedIn, listingController.renderNewForm);

// CREATE - Add new listing to DB
router.post('/', isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing));

// show route
router.get("/listings/:id", wrapAsync(listingController.showListing));


// EDIT - Show form to edit listing
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// ✅ UPDATE - Update listing
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// DELETE - Delete listing
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
