// import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { baseurl } from "../../config";

import React, { useState, useEffect } from "react";

export default function Step4({ data, setData }) {
  useEffect(() => {
    let formdata = new FormData();
    console.log(data);
    formdata.append("vehicleType", data.selectedVehicleType);
    axios
      .post(baseurl + "operations/getVehicleNames", formdata)
      .then((res) => {
        setData((prevState) => ({
          ...prevState,
          vehicleName: res.data.vehicles,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      selectedVehicleName: value,
    }));
  };
  return (
    <FormControl component="fieldset" className="mt-4">
      <FormLabel component="legend">Select Vehicle Brand</FormLabel>
      <RadioGroup
        onChange={handleChange}
        row
        aria-label="Wheels"
        name="row-radio-buttons-group"
        onChange={handleChange}
      >
        {data.vehicleName &&
          data.vehicleName.length > 0 &&
          data.vehicleName.map((item, index) => (
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
