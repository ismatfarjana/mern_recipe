const home = (req, res) => {
  res.render("home");
};

const dashboard = (req, res) => {
  let { email } = req.session.user.email;
  res.render("page/dashboard", { email });
};
module.exports = { home, dashboard };
