const router = require("express").Router();
const UserModel = require("../models/User.model");
// a /signup route to create a new user with email, password and username
router.post("/signup", (req, res) => {
  UserModel.create(req.body)
    .then((userCreated) => {
      res.status(201).json({
        message: "User created successfully!",
        data: userCreated,
      });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err });
    });
});

module.exports = router;
