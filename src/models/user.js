const mongoose = require("mongoose");
// creating the user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  LastName: String,
  //   phone: String,
  emailId: String,
  age: Number,
  gender: String,
  password: {
    type: String,
  },
});
// creating the user model
// syntax:    const modelname= mongoose.model('modelname',schema)
const User = mongoose.model("User", userSchema);

module.exports = User;
