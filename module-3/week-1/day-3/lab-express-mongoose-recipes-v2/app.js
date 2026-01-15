const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const createdRecipe = await RecipeModel.create(req.body);
    console.log("recipe created! Nice work", createdRecipe);
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  RecipeModel.find()
    .then((data) => {
      console.log("Here are all the recipes", data);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  RecipeModel.findById(req.params.id)
    .then((oneRecipe) => {
      console.log("Here is the one recipe", oneRecipe);
      res.status(200).json(oneRecipe);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.patch("/recipes/:recipeId", (req, res) => {
  RecipeModel.findByIdAndUpdate(req.params.recipeId, req.body, { new: true })
    .then((updatedRecipe) => {
      console.log("Here is the one updated recipe", updatedRecipe);
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const deletedRecipe = await RecipeModel.findByIdAndDelete(
      req.params.recipeId
    );
    console.log("Here is the one deleted recipe", deletedRecipe);
    res.status(200).json(deletedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
