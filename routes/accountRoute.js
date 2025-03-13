const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Route to deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to deliver logout view
router.get("/logout", utilities.handleErrors(accountController.accountLogout));

// Route to deliver register view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Route to deliver account view
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
);

// Task 5: Deliver update view
router.get(
  "/update",
  utilities.checkJWTToken,
  utilities.handleErrors(accountController.buildUpdateAccountView)
);

// Task 5: Process update account and change password
router.post(
  "/update",
  utilities.checkJWTToken,
  regValidate.updateAccountRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
);
router.post(
  "/change-password",
  utilities.checkJWTToken,
  regValidate.changePasswordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.changePassword)
);

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = router;
