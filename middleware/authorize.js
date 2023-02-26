const checkLoggedIn = (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).send({
        error: "Not authorized to change data without login.",
        login: "https://cse341render.onrender.com/login",
      });
    }
    next();
  };
  
  module.exports = { checkLoggedIn };