const jwt = require("jsonwebtoken");

//verify if the user is who he claims to be
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json("Token is invalid");
      } else {
        req.userId = user.id;
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

//verify if it is admin and has the right credentials;
const verifyTokenAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userId === req.params.id || req?.user?.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to perform such action");
    }
  });
};

//verify if it is an admin;
const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to perform such action");
    }
  });
};

module.exports = { verifyToken, verifyTokenAuthorization, verifyTokenAdmin };
