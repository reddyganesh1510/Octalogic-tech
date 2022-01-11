import React from "react";
import { TextField } from "@material-ui/core";
function Step1({ data, setData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <div>
        <TextField
          required
          id="first-name"
          label="First Name"
          variant="outlined"
          placeholder="Enter Your First Name"
          value={data.firstName}
          fullWidth
          margin="normal"
          onChange={handleChange}
          name="firstName"
        />
      </div>
      <div>
        <TextField
          required
          id="first-name"
          label="Last Name"
          variant="outlined"
          value={data.lastName}
          placeholder="Enter Your Last Name"
          fullWidth
          margin="normal"
          onChange={handleChange}
          name="lastName"
        />
      </div>
    </>
  );
}

export default Step1;
