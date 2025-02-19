const SignUp = require("../Model/userRegister.model");
const bcrypt = require("bcrypt");
const { tokengenerator } = require("../Middleware/authToken.middleware");

const UserSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findmail = await SignUp.findOne({ email });

    if (findmail) {
      return res.status(404).json({ message: "User Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      ...req.body,
      password: hashedPassword,
    };

    const saveUserData = await SignUp.create(data);

    return res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", Error: error.message });
  }
};

const UserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findEmail = await SignUp.findOne({ email });
    if (!findEmail) {
      return res.status(400).json({ message: "User Not Registered " });
    }
    const isPasswordValid = await bcrypt.compare(password, findEmail.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    } else {
      const token = tokengenerator(findEmail);
      res.status(200).json({ token, findEmail, message: "Signin successful!" });
 
      
    }
  } catch (error) {
    res.status(500).json({
      Error: error.message,
    });
  }
};

module.exports = { UserSignup, UserSignIn };
