const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");

const registerForm = (req, res) => {
  res.render("authentication/register");
};

const registerCreate = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.create({ email, password });
  // attach the registered user to the session
  // req.session.user = user
  // passport login
  req.login(user, err => {
    if (err) {
      return next(err);
    }
  });
  console.log(user);
  res.redirect("/dashboard");
};

const logout = (req, res) => {
  req.logout();
  // remove jwt from cookie
  res.cookie("jwt", null, { maxAge: -1 });
  res.redirect("/");
};

const loginNew = (req, res) => {
  res.render("authentication/login");
};

const login = async (req, res) => {
  const token = jwt.sign({ sub: req.user._id }, "secretkey");
  console.log("token", token);
  // res.json(token);
  res.cookie("jwt", token);
  res.redirect("/dashboard");
  // sign the user details to generate json web token
};

module.exports = {
  registerForm,
  registerCreate,
  logout,
  loginNew,
  login
};
