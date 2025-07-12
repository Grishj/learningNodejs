const express = require("express");
const app = express(); // server create grne
// database rw model lai import grne
const connectDB = require("./config/database");

const User = require("./models/user");
app.use(express.json());

// creating apis
app.post("/signup", async (req, res) => {
  //creating the instance of user model
  const user = new User(req.body);

  console.log(req.body);

  //using try catch for error handling
  try {
    await user.save();
    res.send("User Created successfully");
  } catch (error) {
    res.status(400).send("Error creating the user: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("user not found with this mail");
  }
});

app.get("/feed", async (req, res) => {
  //const userEmail= req.body.emailId;

  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(404).send("something went wrong!");
  }
});

// calling the function

// delete user by id

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const users = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

//update  data of the user by id

// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   try {
//     await User.findByIdAndUpdate(userId, data);
//     res.send("User updated successfully");
//   } catch (error) {
//     res.status(400).send("Spmething went wrong");
//   }
// });


//update user data by email
app.patch("/user", async (req, res) => {
  const email = req.body.emailId;
  const data = req.body;

  try {
    await User.findOneAndUpdate({emailId:email}, data);
    res.send("user updated successfully by email");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully..");
    app.listen(3000, () => {
      console.log("Server is running at the port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected, something went wrong!");
  });
