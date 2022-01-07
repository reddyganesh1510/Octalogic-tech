import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Step2({ data, setData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      noOfWheels: value,
    }));
  };
  return (
    <FormControl component="fieldset" className="mt-4">
      <FormLabel component="legend">Select No. of Wheels</FormLabel>
      <RadioGroup
        value={data.noOfWheels}
        onChange={handleChange}
        row
        aria-label="Wheels"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="4" control={<Radio />} label="Four Wheeler" />
        <FormControlLabel value="2" control={<Radio />} label="Two Wheeler" />
      </RadioGroup>
    </FormControl>
  );
}
