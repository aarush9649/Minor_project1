const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { listingSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const multer= require("multer");
const{storage}=require("../cloudConfig.js")
const upload=multer({storage})

const listingController=require("../controllers/listings.js")

router.route("/").get( 
  wrapAsync(listingController.index)).post( isLoggedIn,
   upload.single('listing[image]'),
   validateListing,
  wrapAsync(listingController.createListing));
 

  
// NEW - Show form to create new listing
router.get('/new', isLoggedIn, listingController.renderNewForm);

  router.route("/:id").get( wrapAsync(listingController.showListing))
  .put( isLoggedIn, isOwner,
      upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// EDIT - Show form to edit listing
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
