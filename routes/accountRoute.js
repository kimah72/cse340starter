const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to deliver register view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  // This is how it will handle it later once the login process is built
  // utilities.handleErrors(accountController.processLogin)
  (req, res) => {
    res.status(200).send('login process complete')
  }
)

module.exports = router;