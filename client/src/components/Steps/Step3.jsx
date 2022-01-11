// import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { baseurl } from "../../config";

import React, { useState, useEffect } from "react";

export default function Step3({ data, setData }) {
  useEffect(() => {
    let formdata = new FormData();
    console.log(data);
    formdata.append("noOfWheels", data.noOfWheels);
    axios
      .post(baseurl + "operations/getVehicleTypes", formdata)
      .then((res) => {
        setData((prevState) => ({
          ...prevState,
          vehicleTypes: res.data.vehicles,
        }));
        if (data.dataChangedAt < 2) {
          setData((prevState) => ({
            ...prevState,
            selectedVehicleType: res.data.vehicles[0],
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      selectedVehicleType: value,
      dataChangedAt: 2,
    }));
  };
  return (
    <FormControl component="fieldset" className="mt-4">
      <FormLabel component="legend">Select Vehicle Type</FormLabel>
      <RadioGroup
        onChange={handleChange}
        row
        value={data.selectedVehicleType}
        aria-label="Wheels"
        name="row-radio-buttons-group"
        onChange={handleChange}
      >
        {data.vehicleTypes &&
          data.vehicleTypes.length > 0 &&
          data.vehicleTypes.map((item, index) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio />}
              label={item}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}
