import React from "react";
import StepperE from "../Stepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
function Home() {
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <StepperE />
        </Paper>
      </Container>
    </>
  );
}

export default Home;
