const router = require("express").Router();
const Vehicle = require('../models/Vehicle')
const Booking = require('../models/Booking')

router.post('/bookVehicle',async (req,res)=>{
    try {
        let message = 'Booking unsucessfull. Please choose another date'
        let data = JSON.parse(req.body.data);
        let startDate = Date.parse(data.startDate)
        let endDate = Date.parse(data.endDate)
        console.log(startDate);
        let statusS = await Booking.find({bookingStartDate:{$gte:startDate,$lte:endDate}})
        let statusV = await Booking.find({bookingEndDate:{$gte:startDate,$lte:endDate}})
        let statusS1 = await Booking.find({bookingStartDate:{$gte:startDate,$lte:endDate}})
        let statusV1 = await Booking.find({bookingEndDate:{$gte:startDate,$lte:endDate}})
        if(statusS.length==0 && statusV.length==0 && statusS1.length==0 && statusV1.length==0){
            let newData = await Booking.create({vehicleName:data.selectedVehicleType,firstName:data.firstName,lastName:data.lastName,bookingStartDate:startDate,bookingEndDate:endDate})
           message='Booking done successfully'
        }
        console.log(statusS,statusV);
        return res.status(200).send({
            message: message
            
        })
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            message: 'Some error occurred',
            error:error
        })
    }
})

module.exports = router;
