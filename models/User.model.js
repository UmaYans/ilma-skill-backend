const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  phone: String,
  photo: String,
  rating: Number,
  password: String,
  role: String,
  email: { type: "String", unique: true, required: true },
  avatar: {
    type: String,
    default: "public\\user.png",
  },
  money: {
    type: Number,
    default: 0,
  },
  myCourses: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Service",
    },
  ],
  saveCourses: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Service",
    },
  ],
  login: {
    type: String,
    unique: true,
  },
  isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestaps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
