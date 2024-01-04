const express = require("express");
const router = express.Router();
const User = require("../models/User");

const register = require("../controllers/authControllers/register");
const login = require("../controllers/authControllers/login");

router.post("/createuser", register);
router.post("/login", login);

// router.post("/getuser", fetchuser, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select("-password");
//     res.send({ user });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
