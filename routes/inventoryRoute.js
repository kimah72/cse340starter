const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const invController = require("../controllers/invController");
const validate = require("../utilities/inventory-validation");
const Util = require("../utilities/"); // Assuming Util is exported from here

// public Routes (no auth required)
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);
router.get(
  "/detail/:id",
  utilities.handleErrors(invController.getVehicleDetails)
);
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

// Admin Routes (protected with checkAccountType)
router.get(
  "/",
  Util.checkAccountType,
  utilities.handleErrors(invController.buildManagementView)
);
router.get(
  "/add-classification",
  Util.checkAccountType,
  utilities.handleErrors(invController.buildAddClassification)
);
router.post(
  "/add-classification",
  Util.checkAccountType,
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);
router.get(
  "/add-inventory",
  Util.checkAccountType,
  utilities.handleErrors(invController.buildAddInventory)
);
router.post(
  "/add-inventory",
  Util.checkAccountType,
  validate.inventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);
router.get(
  "/edit/:id",
  Util.checkAccountType,
  utilities.handleErrors(invController.editInventoryView)
);
router.post(
  "/update/",
  Util.checkAccountType,
  validate.updateInventoryRules(),
  validate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);
router.get(
  "/delete/:id",
  Util.checkAccountType,
  utilities.handleErrors(invController.buildDeleteConfirmView)
);
router.post(
  "/delete",
  Util.checkAccountType,
  utilities.handleErrors(invController.deleteInventoryItem)
);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = router;
