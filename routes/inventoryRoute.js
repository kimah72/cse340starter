const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const validate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get('/type/:classificationId', utilities.handleErrors(invController.buildByClassificationId));

// New route for individual vehicle details
router.get('/detail/:id', utilities.handleErrors(invController.getVehicleDetails));

// Build management view
router.get("/", utilities.handleErrors(invController.buildManagementView))

// Add GET routes for forms
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// Add a new classification
router.post("/add-classification", 
  validate.classificationRules(), 
  validate.checkClassificationData, 
  utilities.handleErrors(invController.addClassification)
)

// Add a new inventory item
router.post("/add-inventory", 
  validate.inventoryRules(), 
  validate.checkInventoryData, 
  utilities.handleErrors(invController.addInventory)
)

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

module.exports = router;