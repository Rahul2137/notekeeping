const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  let success = false;
  try {
    if (req.body.password !== req.body.cpassword) {
      return res
        .status(400)
        .json({ success, errors: "Please re-enter password correctly." });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success, errors: "A user with this email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.status(201).json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = register;
