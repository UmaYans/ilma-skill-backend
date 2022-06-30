const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: String,
  description: String,
  tags: [String],
  photo: String,
  price: Number,
  oldPrice: Number,
  content: Number,
<<<<<<< HEAD
  format: [String],
=======
  format: String,
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
>>>>>>> 2eb9572b5f0d6505c580677fa2d4e4edff2d8161
  rating: Number,
  time: {
    start: Number,
    end: Number,
  },
  catId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
