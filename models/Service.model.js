const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: String,
  description: String,
  tags: [String],
  photo: String,
  price: Number,
  oldPrice: Number,
  content: Number,
  format: String,
  rating: Number,
  time: {
    start: Number,
    end: Number
  },
  catId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
