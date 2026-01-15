const PetModel = require("../models/Pet.model");
const UserModel = require("../models/User.model");
const router = require("express").Router();

//create a pet
router.post("/create", async (req, res) => {
  try {
    const createdPet = await PetModel.create(req.body);
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.body.owner,
      { $push: { pets: createdPet._id } },
      { new: true }
    );
    res.status(201).json({ createdPet, updatedUser });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

//route to find all pets in the DB
router.get("/all-pets", async (req, res) => {
  try {
    const data = await PetModel.find().populate("owner", "-password");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

// route to find one specific pet based on _id in the URL
router.get("/one-pet/:id", async (req, res) => {
  try {
    const foundPetById = await PetModel.findById(req.params.id).populate(
      "owner",
      "username profilePicture"
    );
    res.status(200).json(foundPetById);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

// update a pet route
router.put("/update-pet/:petId", (req, res) => {
  PetModel.findByIdAndUpdate(req.params.petId, req.body, { new: true })
    .then((updatedPet) => {
      res.status(200).json(updatedPet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});
//delete a pet route

router.delete("/delete-pet/:petId", (req, res) => {
  PetModel.findByIdAndDelete(req.params.petId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

module.exports = router;
