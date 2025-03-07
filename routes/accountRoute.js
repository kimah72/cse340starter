const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to deliver register view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Route to deliver account view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

  router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
  )

module.exports = router;