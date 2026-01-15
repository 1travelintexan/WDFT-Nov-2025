//pet has a name, age, type, and breed and the hard part is a owner that is linked to a user
const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  description: { type: String },
  image: {
    type: String,
    default:
      "https://plus.unsplash.com/premium_photo-1748218891225-fb810c4c0db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGV0JTIwdXNlciUyMHByb2ZpbGUlMjBwbGFjZWhvbGRlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  type: { type: String },
  breed: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Pet", petSchema);
