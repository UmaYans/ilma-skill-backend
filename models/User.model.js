const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  phone: String,
  photo: String,
  rating: Number,
  password: String,
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
  login: {
    type: String,
    unique: true,
  },
  role: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
