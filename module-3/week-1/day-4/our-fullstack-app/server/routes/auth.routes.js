const router = require("express").Router();
const UserModel = require("../models/User.model");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware");
//route to /signup a new user
router.post("/signup", async (req, res) => {
  //destructur the req.body
  const { email, password } = req.body;
  try {
    const userAlreadyInDB = await UserModel.findOne({ email });
    if (userAlreadyInDB) {
      res.status(403).json({ errorMessage: "Invalid Credentials" });
    } else {
      const theSalt = bcryptjs.genSaltSync(12);
      const theHashedPassword = bcryptjs.hashSync(password, theSalt);
      const hashedUser = {
        ...req.body,
        password: theHashedPassword,
      };
      const createdUser = await UserModel.create(hashedUser);
      res.status(201).json(createdUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMesage: error });
  }
});

//route to /login an existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAlreadyInDB = await UserModel.findOne({ email });
    if (!userAlreadyInDB) {
      res.status(403).json({ errorMessage: "Invalid Credentials" });
    } else {
      const doesPasswordsMatch = bcryptjs.compareSync(
        password,
        userAlreadyInDB.password
      );
      if (!doesPasswordsMatch) {
        res.status(403).json({ errorMessage: "Invalid Credentials" });
      } else {
        const payload = { _id: userAlreadyInDB._id };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res
          .status(200)
          .json({ message: "you are now logged in, nice work", authToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMesage: error });
  }
});

//this route verifies the auth token
router.get("/verify", isAuthenticated, (req, res) => {
  res
    .status(200)
    .json({ message: "Token is valid :) ", decodedToken: req.payload });
});
module.exports = router;
