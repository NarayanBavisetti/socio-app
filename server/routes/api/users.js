const express = require("express");
const router = express.Router();
const gravatar = require("gravator");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const User = require("../../models/User");
router.post(
  "/",
  body("name", "Name is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
  body("password", "password must be more than 5 charactersctic").isLength({
    min: 6,
  }),
  async (req, res) => {
    const error = validationResult(req);
    // console.log(req.body);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { name, email, password } = req.body;
    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      //get users gravator
    //   const avatar = gravator.url(email, {
    //     s: "200",
    //     r: "pg",
    //     d: "retro",
    //   }, true);
    // avatar: gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true)

      user = new User({
        name,
        email,
        password,
        // avatar
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return jsonwebtoken

      res.send("users registered");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
