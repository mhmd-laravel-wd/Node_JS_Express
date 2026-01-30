const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a new schema to define the structure of the data
const dataSchema = new Schema({
  // Username field
  // - type: must be a string
  // - required: cannot be empty
  username: {
    type: String,
    required: [true, "Username is required"], // Validation message
    trim: true, // Remove extra spaces
  },
  password: {
    type: String,
    required: [true, "Password is required"], // Validation message
    trim: true, // Remove extra spaces
  },
});

// Create a Mongoose model based on the schema
const User = mongoose.model("User", dataSchema);

// Export the model so it can be used in other files
module.exports = User;
