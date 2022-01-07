const mongoose = require("mongoose");
const vehicleSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true},
  noOfWheels: { type: Number, required: true },
  vehicleType: { type: String },
});
module.exports = User = mongoose.model("vehicle", vehicleSchema);
