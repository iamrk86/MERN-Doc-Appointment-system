const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "auth failed",
          succcess: false,
        });
      } else {
        req.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong",
      succcess: false,
      error,
    });
  }
};

module.exports = authMiddleware;
