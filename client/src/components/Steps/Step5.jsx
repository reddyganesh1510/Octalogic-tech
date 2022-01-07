import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

export default function Step5({ data, setData }) {
  const [value, setValue] = React.useState(Date.now());
  const [evalue, seteValue] = React.useState(Date.now());

  const handleChange = (newValue) => {
    setValue(newValue);

    console.log(newValue);
    setData((prevState) => ({
      ...prevState,
      startDate: newValue,
    }));
  };
  const handleChange2 = (newValue) => {
    seteValue(newValue);
    console.log(newValue);
    setData((prevState) => ({
      ...prevState,
      endDate: newValue,
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack className="mt-4" spacing={3}>
        <DesktopDatePicker
          label="Start Date"
          inputFormat="dd/MM/yyyy"
          value={value}
          name="startDate"
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="End Date"
          inputFormat="dd/MM/yyyy"
          value={evalue}
          name="endDate"
          onChange={handleChange2}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
