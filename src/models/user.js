const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [50, "First name must be at most 50 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [50, "Last name must be at most 50 characters"],
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?\d{7,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    emailId: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    age: {
      type: Number,
      min: [18, "Age must be positive"],
      max: [120, "Age seems unrealistic"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // to avoid exposing password by default
    },
    photoUrl: {
      type: String,
      default: "data:image/webp;base64,UklG...",
    },
    about: {
      type: String,
      default: "This is the default about of the user",
      maxlength: [500, "About can be at most 500 characters"],
    },
    skills: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length <= 20;
        },
        message: "You can have at most 20 skills",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
