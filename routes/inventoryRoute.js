// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventory-validation") // Adjust path as necessary

// Route to build inventory by classification view
router.get('/type/:classificationId', utilities.handleErrors(invController.buildByClassificationId));

// New route for individual vehicle details
router.get('/detail/:id', utilities.handleErrors(invController.getVehicleDetails));

// Build management view
router.get("/", utilities.handleErrors(invController.buildManagement))

// GET routes for showing the forms
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// Add a new classification
router.post("/add-classification", utilities.handleErrors(invController.addClassification))

// Add a new inventory item
router.post("/add-inventory", 
    invValidate.inventoryRules(), 
    invValidate.checkInventoryData, 
    utilities.handleErrors(invController.addInventory)
  )
  
module.exports = router;