const Joi = require('joi');


// Listing Validation Schema
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({
      'any.required': '"title" is required',
      'string.empty': '"title" cannot be empty'
    }),
    description: Joi.string().required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({
      url: Joi.string().allow('', null),
      filename: Joi.string().allow('', null)
    }).allow(null)  // Now matches your form structure
  }).required()
});


// Review Validation Schema
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  }).required()
});

module.exports = {
  listingSchema,
  reviewSchema
};
