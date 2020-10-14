const authorisationRedirect = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect("/dashboard");
  }
  return next();
};

const authorise = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.redirect("/");
};

module.exports = { authorisationRedirect, authorise };
