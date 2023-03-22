const mongoose = require('mongoose');

// Define your schema
const dataBaseSchema = new mongoose.Schema({
  dataBaseName: {
    type: String,
    required: true
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const dataBaseModel = mongoose.model('User', dataBaseSchema);

// Export the User model
module.exports =dataBaseModel;
