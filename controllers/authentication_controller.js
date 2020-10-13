const UserModel = require("../models/User.model");

const registerForm = (req, res) => {
  res.render("authentication/register");
};

const registerCreate = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.create({ email, password });
    req.session.user = user;
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const loginNew = (req, res) => {
  res.render("authentication/login");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await UserModel.findOne({ email });
  const userPassword = await userEmail.verifyPassword(password);
  try {
    if (!userEmail || !userPassword) {
      return res.render("authentication/login", {
        error: "Invalid email or password."
      });
    }
  } catch (err) {
    console.log(err);
  }

  req.session.user = userEmail;
  res.redirect("/dashboard");
};

module.exports = {
  registerForm,
  registerCreate,
  logout,
  loginNew,
  login
};
