const { Schema, model } = require("mongoose");

//create a schema for our pets
const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  petType: {
    type: String,
    enum: ["dog", "cat", "bird", "snake", "fish", "other"],
    required: true,
  },
  playsWellWithOthers: Boolean,
  isAggressive: {
    type: Boolean,
  },
});

//after defining the shape, we create the model
const PetModel = model("pet", petSchema);
// export the model for the rest of the files
module.exports = PetModel;
