const mongoose = require("mongoose");
// connecting to database using mongoose
const connectDB = async () => {
  await mongoose.connect(
    //mongoose.connect le promise return grxa so we use async await
    "mongodb+srv://DevTinder:4hNISCiFTlXqVlU8@devhub.rygx0b8.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
