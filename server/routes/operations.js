const router = require("express").Router();
const Vehicle = require('../models/Vehicle')

router.post('/addData',async(req,res)=>{
    try {
        let data = JSON.parse(req.body.vehicleData)
let addedData = await Vehicle.insertMany(data)
// console.log(addedData);
return res.status(200).send({
    message:'Data added successfully'
})
        
        
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred',
            error:error
        })
    }
})

router.post('/getVehicleTypes',async (req,res)=>{
    try {
        const vehicleSet = new Set()
        let vehicles = await Vehicle.find
        ({noOfWheels:req.body.noOfWheels}).select({'vehicleType':1})
        for(let item of vehicles){
            vehicleSet.add(item.vehicleType)
        }
       let vehiclesNew= Array.from(vehicleSet);
// console.log(vehiclesNew);
        return res.status(200).send({
            vehicles:vehiclesNew,
            message:'Data retrieved successfully'
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred',
            error:error
        })
    }
})
router.post('/getVehicleNames',async (req,res)=>{
    try {
        const vehicleSet = new Set()

        let vehicles = await Vehicle.find({vehicleType:req.body.vehicleType}).select({'vehicleName':1})
        for(let item of vehicles){
            vehicleSet.add(item.vehicleName
                
                
                
                
                )
        }
        vehiclesNew= Array.from(vehicleSet);
        return res.status(200).send({
            vehicles:vehiclesNew,
            message:'Data retrieved successfully'
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred',
            error:error
        })
    }
})


module.exports = router;
