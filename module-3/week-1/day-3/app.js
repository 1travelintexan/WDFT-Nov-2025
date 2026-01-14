const express = require("express");
const app = express();
const morgan = require("morgan");

//import the model to CRUD pets
const PetModel = require("./models/Pet.model");
//middlewares
app.use(express.json());
app.use(morgan("dev"));
//this connects the to the DB
const mongoose = require("mongoose");
const UserModel = require("./models/User.model");
mongoose
  .connect("mongodb://localhost:27017/Pets-Pets-Pets")
  .then(() => {
    console.log("Connected to the DB, Nice work!");
  })
  .catch((err) => console.log(err));

// routes
// route to create a pet
app.post("/create-a-pet", (req, res) => {
  //   console.log("REQ.body: ", req.body);
  PetModel.create(req.body)
    .then((data) => {
      console.log("pet added", data);
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});
//route to find all pets
app.get("/pets", async (req, res) => {
  try {
    const data = await PetModel.find().populate("owner", "username");
    console.log("pets found", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});
//route to get one specific pet
app.get("/one-pet/:petId", async (req, res) => {
  try {
    const foundOnePet = await PetModel.findById(req.params.petId).populate(
      "owner"
    );
    console.log("pet found", foundOnePet);
    res.status(200).json(foundOnePet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});
//delete a pet
app.delete("/delete-pet/:petId", (req, res) => {
  PetModel.findByIdAndDelete(req.params.petId)
    .then((data) => {
      console.log("pets deleted", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

//update a pet in the DB
app.patch("/update-pet/:petId", (req, res) => {
  const { petId } = req.params;
  PetModel.findByIdAndUpdate(petId, req.body, { new: true })
    .then((updatedPet) => {
      console.log("pets updated", updatedPet);
      res.status(200).json(updatedPet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

///********************USER ROUTES ************ */
app.post("/create-user", async (req, res) => {
  try {
    const newUserInDB = await UserModel.create(req.body);
    console.log("user created", newUserInDB);
    res.status(201).json(newUserInDB);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});
//this starts the server so it listens for requests
app.listen(5005, () => {
  console.log("server running on port 5005");
});
