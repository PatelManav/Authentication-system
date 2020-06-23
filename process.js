const express = require("express");

const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("./User");

/// user signup

router.post(
  "/signup",
  [
    check("username", "please enter the valid username").not().isEmpty(),
    check("email", "please enter the valid email").isEmail(),
    check("password", "please enter the valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const chk = validationResult(req);
    if (!chk.isEmpty()) return res.status(400).json({ errors: chk.array() });
    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email }); //// check weather this email is occupied
      if (user) {
        return res.status(400).json({ message: "email already in use" });
      }
      user = new User({
        username,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(14);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (ex) {
      console.log(ex.message);
      res.status(500).send("Error in Saving");
    }
  }
);

module.exports = router;
