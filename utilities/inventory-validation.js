const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const utilities = require(".")

const validate = {}

/* ******************************
 *  Inventory Validation Rules
 * ***************************** */
  validate.inventoryRules = () => {
    return [
      body("classification_id")
        .trim()
        .notEmpty()
        .withMessage("Please select a classification."),
  
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Make is required."),
  
      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Model is required."),
  
      body("inv_year")
        .trim()
        .escape()
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
        .withMessage("Year must be between 1900 and next year."),

      body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Color is required."),
  
      body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Description is required."),
  
      body("inv_image")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Image path is required."),
  
      body("inv_thumbnail")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Thumbnail path is required."),
  
      body("inv_price")
        .trim()
        .escape()
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number."),
  
      body("inv_miles")
        .trim()
        .escape()
        .isInt({ min: 0 })
        .withMessage("Mileage must be a non-negative integer."),        
    ]
  }
  
  /* ******************************
   * Check Inventory Data and return errors or continue to addition
   * ***************************** */
  validate.checkInventoryData = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      const classificationList = await utilities.buildClassificationList(req.body.classification_id)
      
      return res.render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        errors: errors.array(),
        classificationList,
        ...req.body 
      })
    }
    next()
  }

  module.exports = validate