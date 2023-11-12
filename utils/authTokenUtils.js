require("dotenv").config();
const jwt = require("jsonwebtoken");

const createJWT = async (user) => {
  const token = jwt.sign(
    {
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY
  );

  return token;
};


const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({
      message: "Unauthorized user. Access denied.",
    });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(403).json({
        message: "Invalid or expired token. Access forbidden.",
      });


    req.username = decoded.username;
    req.role = decoded.role;
    next();
  });
};
module.exports = {
  createJWT,
  validateToken
};