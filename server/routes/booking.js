const router = require("express").Router();
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");

router.post("/bookVehicle", async (req, res) => {
  try {
    let message = "Booking unsucessfull. Please choose another date";
    let data = JSON.parse(req.body.data);
    let startDate = Date.parse(data.startDate);
    let endDate = Date.parse(data.endDate);
    console.log(startDate);

    let statusS = await Booking.findOne({
      bookingStartDate: { $gte: startDate, $lte: endDate },
    });
    let statusV = await Booking.findOne({
      bookingEndDate: { $gte: startDate, $lte: endDate },
    });
    console.log(statusS, statusV);

    // let statusS1 = await Booking.find({bookingStartDate:{$gte:startDate,$lte:endDate}})
    // let statusV1 = await Booking.find({bookingEndDate:{$gte:startDate,$lte:endDate}})
    if (statusS == null && statusV == null) {
      let newData = await Booking.create({
        vehicleName: data.selectedVehicleType,
        firstName: data.firstName,
        lastName: data.lastName,
        bookingStartDate: startDate,
        bookingEndDate: endDate,
        noOfWheels: data.noOfWheels,
      });
      message = "Booking done successfully";
    } else {
      if (statusS != null) {
        if (statusS.noOfWheels != data.noOfWheels) {
          let newData = await Booking.create({
            vehicleName: data.selectedVehicleType,
            firstName: data.firstName,
            lastName: data.lastName,
            bookingStartDate: startDate,
            bookingEndDate: endDate,
            noOfWheels: data.noOfWheels,
          });
          message = "Booking done successfully";
        }
      } else {
        if (statusV.noOfWheels != data.noOfWheels) {
          let newData = await Booking.create({
            vehicleName: data.selectedVehicleType,
            firstName: data.firstName,
            lastName: data.lastName,
            bookingStartDate: startDate,
            bookingEndDate: endDate,
            noOfWheels: data.noOfWheels,
          });
          message = "Booking done successfully";
        }
      }
    }
    return res.status(200).send({
      message: message,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      message: "Some error occurred",
      error: error,
    });
  }
});

module.exports = router;
