const fetch = require('node-fetch')

var vehicles= [
    {vehicleName:'Baleno',noOfWheels: 4,vehicleType:"Hatchback"},
    {vehicleName:'Altroz',noOfWheels: 4,vehicleType:"Hatchback"},
    {vehicleName:'Tiago',noOfWheels: 4,vehicleType:"Hatchback"},
    {vehicleName:'Vento',noOfWheels: 4,vehicleType:"Sedan"},
    {vehicleName:'Ciaz',noOfWheels: 4,vehicleType:"Sedan"},
    {vehicleName:'City',noOfWheels: 4,vehicleType:"Sedan"},
    {vehicleName:'Sonet',noOfWheels: 4,vehicleType:"Compact SUV"},
    {vehicleName:'Nexon',noOfWheels: 4,vehicleType:"Compact SUV"},
    {vehicleName:'Brezza',noOfWheels: 4,vehicleType:"Compact SUV"},
    {vehicleName:'Ducati',noOfWheels: 2,vehicleType:"Sports"},
    {vehicleName:'BMW',noOfWheels: 2,vehicleType:"Sports"},

]

const data = new URLSearchParams();

    data.append('vehicleData', JSON.stringify(vehicles));


const addData=()=>{
    fetch('http://localhost:8000/operations/addData', {
    method: 'post',
    body: data,
})
.then((res)=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})
}
addData()