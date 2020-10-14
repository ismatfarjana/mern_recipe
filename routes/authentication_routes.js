const express = require("express");
const router = express.Router();
const {
  authorisationRedirect,
  authorise
} = require("../middleware/authorisation_middleware");

const {
  registerForm,
  registerCreate,
  logout,
  loginNew,
  login
  // loginCreate
} = require("../controllers/authentication_controller");

router.get("/register", registerForm);
router.post("/register", registerCreate);
router.get("/logout", logout);
router.get("/login", loginNew);
router.post("/login", login);

module.exports = router;
