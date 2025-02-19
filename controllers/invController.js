const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  
  if (!data || data.length === 0) {
    let nav = await utilities.getNav()
    return res.render("./errors/error", {
      title: "No Vehicles Found",
      message: "No vehicles match this classification.",
      nav
    });
  }
  
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
      let nav = await utilities.getNav()
      return res.render("./errors/error", {
        title: "404 Error",
        status: 404,
        message: "Vehicle not found.",
        nav
      });
    }
    // This will force an error
    // const undefinedValue = undefined;
    // undefinedValue.nonExistentProperty;
    
    const html = utilities.formatVehicleDetails(vehicle);
    let nav = await utilities.getNav()
    res.render("./inventory/detail", { 
      title: `${vehicle.inv_make} ${vehicle.inv_model} Details`,
      nav,
      vehicle: html 
    });
    
  } catch (error) {
    console.error("Error in getVehicleDetails:", error);
    let nav = await utilities.getNav()
    res.status(500).render("./errors/error", {
      title: "500 Error",
      status: 500,
      message: "An error occurred while fetching vehicle details.",
      nav
    });
  }
}

/* ***************************
*  Build Management
* ************************** */
invCont.buildManagement = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    message: req.flash('message')
  })
}

/* ***************************
 *  Build Add Classification Form
 * ************************** */
invCont.buildAddClassification = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    message: null
  })
}

/* ***************************
 *  Build Add Inventory Form
 * ************************** */
invCont.buildAddInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    message: null,
    classificationList
  })
}

/* ***************************
 *  Add classification view
 * ************************** */
invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
  const classificationResult = await invModel.addClassification(classification_name)

  if (classificationResult) {
    req.flash('message', 'Classification added successfully!')
    nav = await utilities.getNav() // Refresh nav to include new classification
    return res.render("inventory/management", { title: "Inventory Management", nav, message: req.flash('message') })
  } else {
    req.flash('message', 'Failed to add classification.')
    return res.render("inventory/add-classification", { title: "Add Classification", nav, message: req.flash('message') })
  }
}

/* ***************************
 *  Add inventory item view
 * ************************** */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(req.body.classification_id || null)
  const inventoryData = {
    classification_id: req.body.classification_id,
    inv_make: req.body.inv_make,
    inv_model: req.body.inv_model,
    inv_year: req.body.inv_year,
    inv_color: req.body.inv_color,
    inv_description: req.body.inv_description,
    inv_image: req.body.inv_image,
    inv_thumbnail: req.body.inv_thumbnail,
    inv_price: req.body.inv_price,
    inv_miles: req.body.inv_miles
  }

  const inventoryResult = await invModel.addInventory(inventoryData)

  if (inventoryResult) {
    req.flash('message', 'Inventory item added successfully!')
    return res.render("inventory/management", { title: "Inventory Management", nav, message: req.flash('message') })
  } else {
    req.flash('message', 'Failed to add inventory item.')
    res.render("inventory/add-inventory", { 
      title: "Add Inventory", 
      nav, 
      message: req.flash('message'), 
      classificationList,
      ...inventoryData
    })
  }
}

module.exports = invCont