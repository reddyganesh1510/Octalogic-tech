const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  bookingStartDate: { type: Number },
  bookingEndDate: { type: Number },
  noOfWheels: { type: String },
});
module.exports = User = mongoose.model("booking", bookingSchema);
