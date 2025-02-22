import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Custom styled StepConnector with transition for smooth visual updates
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: "#ccc", // Default gray color for the connector line
    borderTopWidth: 3,
    transition: "border-color 0.5s ease", // Smooth transition for color change
  },
  [`&.Mui-active .MuiStepConnector-line, &.Mui-completed .MuiStepConnector-line`]: {
    borderColor: "#8CB89F", // Green color for active and completed steps
  },
}));

// Custom Step Icon Component with Step Number
const CustomStepIcon = ({ active, completed, icon, isCancelled }) => {
  const stepStyle = {
    backgroundColor: completed ? "#8CB89F" : isCancelled && icon === 2 ? "#FF5252" : "#ccc", // Red for cancelled step
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    fontFamily: "Roboto",
    transition: "background 1s ease", // Smooth transition for background color
  };

  return <Box style={stepStyle} sx={{ width: 32, height: 32 }}>{icon}</Box>; // Display step number
};

// StepperProgress component to display the progress of an order
const StepperProgress = ({ step, stepsArr, isCancelled }) => {
  const theme = useTheme(); // Access the theme
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Determine if the screen size is mobile

  return (
    <Box sx={{ width: "100%", px: { xs: 0.2, md: 3 }, py: 3 }}>
      <Stepper
        activeStep={step} // Set the active step
        alternativeLabel={!isMobile} // Use alternative label for non-mobile
        orientation={isMobile ? "vertical" : "horizontal"} // Orientation based on screen size
        connector={<CustomStepConnector />} // Use custom connector
        sx={{ width: "100%" }}
      >
        {stepsArr?.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={(props) => (
              <CustomStepIcon {...props} isCancelled={isCancelled} icon={index + 1} />
            )}>
              <Typography sx={{ fontSize: "12px" }}>{label}</Typography> {/* Display step label */}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperProgress;