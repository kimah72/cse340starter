/* ***************************
 * Manager for handling different tasks related to an inventory system
 * Fetches Data
 * Prepares Data for Display
 * Renders Views
 * Handles Errors
 * *************************** */

const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 * Build vehicle details for specific inventory item
 * ***************************/
invCont.getVehicleDetails = async function (req, res) {
  try {
    const vehicle = await invModel.getVehicleById(req.params.id);
    if (!vehicle) {
      return res.status(404).send('Vehicle not found');
    }
    const html = utilities.formatVehicleDetails(vehicle);
    let nav = await utilities.getNav()
    res.render("./inventory/detail", { 
      title: `${vehicle.inv_make} ${vehicle.inv_model} Details`,
      nav,
      vehicle: html 
    });
  } catch (error) {
    console.error("Error in getVehicleDetails:", error);
    res.status(500).send("An error occurred while fetching vehicle details.");
  }
}

module.exports = invCont