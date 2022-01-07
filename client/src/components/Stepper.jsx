import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";

import axios from "axios";
import { baseurl } from "../config";
const steps = [
  "Name ",
  "No. of wheels",
  "Vehicle Type",
  "Vehicle Name",
  "Book",
];

export default function StepperE() {
  const date = new Date();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [DisabledNext, setDisabledNext] = useState(true);
  const [message, setmessage] = useState("");

  const [Data, setData] = useState({
    firstName: "",
    lastName: "",
    noOfWheels: "4",
    vehicleTypes: [],
    selectedVehicleType: "",
    vehicleName: [],
    selectedVehicleName: "",
    startDate: date.toISOString(),
    endDate: date.toISOString(),
  });

  const getStep = (activeStep) => {
    // console.log(activeStep);
    if (activeStep == 0) {
      return <Step1 data={Data} setData={setData} />;
    }
    if (activeStep == 1) {
      return <Step2 data={Data} setData={setData} />;
    }
    if (activeStep == 2) {
      return <Step3 data={Data} setData={setData} />;
    }
    if (activeStep == 3) {
      return <Step4 data={Data} setData={setData} />;
    }
    if (activeStep == 4) {
      return <Step5 data={Data} setData={setData} />;
    }
  };

  useEffect(() => {
    console.log(Data);
    setDisabled();
  }, [Data]);
  const setDisabled = () => {
    if (activeStep == 0) {
      if (Data.firstName.length == 0 || Data.lastName.length == 0) {
        setDisabledNext(true);
      } else {
        setDisabledNext(false);
      }
    }
    if (activeStep == 2) {
      if (Data.selectedVehicleType.length == 0) {
        setDisabledNext(true);
      } else {
        setDisabledNext(false);
      }
    }
    if (activeStep == 3) {
      if (Data.selectedVehicleName.length == 0) {
        setDisabledNext(true);
      } else {
        setDisabledNext(false);
      }
    }
    if (activeStep == 4) {
      if (Data.startDate.length == 0 || Data.endDate.length == 0) {
        setDisabledNext(true);
      } else {
        setDisabledNext(false);
      }
    }
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep == 4) {
      let fd = new FormData();
      fd.append("data", JSON.stringify(Data));
      axios
        .post(baseurl + "book/bookVehicle", fd)
        .then((res) => {
          setmessage(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep == 2) {
      setData((prevState) => ({
        ...prevState,
        selectedVehicleType: "",
      }));
    }
    if (activeStep == 3) {
      setData((prevState) => ({
        ...prevState,
        selectedVehicleName: "",
      }));
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setData({
      firstName: "",
      lastName: "",
      noOfWheels: "4",
      vehicleTypes: [],
      selectedVehicleType: "",
      vehicleName: [],
      selectedVehicleName: "",
      startDate: date.toISOString(),
      endDate: date.toISOString(),
    });
    setmessage("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{message}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {getStep(activeStep)}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button disabled={DisabledNext} onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
