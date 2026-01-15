const router = require("express").Router();
const UserModel = require("../models/User.model");

const bcryptjs = require("bcryptjs");

// a /signup route to create a new user with email, password and username
router.post("/signup", async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (foundUser) {
      res.status(403).json({ errorMessage: "Email already taken" });
    } else {
      //generate the salt
      const theSalt = bcryptjs.genSaltSync(12);
      //generate the hashed password
      const hashedPassword = bcryptjs.hashSync(req.body.password, theSalt);
      console.log("the salt", theSalt);
      console.log({ hashedPassword, password: req.body.password });
      const createdUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).json(createdUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(403).json({ errorMessage: "Email doesnt exist" });
    } else {
      const doesPasswordMatch = bcryptjs.compareSync(
        req.body.password,
        foundUser.password
      );
      console.log("Does password match?", doesPasswordMatch);
      if (!doesPasswordMatch) {
        res.status(403).json({ errorMessage: "Password incorrect" });
      } else {
        res.status(200).json({ message: "You are now logged in! Nice work" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});
module.exports = router;
