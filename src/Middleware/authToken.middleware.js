const jwt = require("jsonwebtoken");
const Signup = require("../Model/userRegister.model");
const key = "1234567890qwertyWERTYUIJHGFuioplkjhgfdsazxcvbnm,./{_+)!@#$%^";

const tokengenerator = (userdata) => {
  const token = jwt.sign({ userdata }, key, { expiresIn: "1h" });
  return token;
};

const verifyToken = async (req, res, next) => {

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "user must be Signup " });
  }
  const withoutBearer = token.split(" ")[1];

  try {
    const verifyKeyInPayload = jwt.verify(withoutBearer, key);

    const checkUser = await Signup.findById(verifyKeyInPayload.userdata._id);
    if (!checkUser) {
      return res.status(400).json({ message: "User Not Found For this Token" });
    }

    next();
  } catch (error) {
    res.json({
      Error: error.message,
    });
  }
};

module.exports = { tokengenerator, verifyToken };
