import React from "react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

// Custom connector for the stepper
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: "calc(-50% + 10px)",
    right: "calc(50% + 10px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#4CAF50", // Active step line color
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#4CAF50", // Completed step line color
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0", // Default line color
    borderRadius: 1,
  },
}));

// Custom step icon styling
const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#eaeaf0", // Default icon background color
  zIndex: 1,
  color: "#fff",
  width: 12,
  height: 12,
  borderRadius: "50%",
  ...(ownerState.active && {
    backgroundColor: "#4CAF50", // Active icon background color
  }),
  ...(ownerState.completed && {
    backgroundColor: "#4CAF50", // Completed icon background color
  }),
}));

// Custom step icon component
function CustomStepIcon(props) {
  const { active, completed, className } = props;
  return (
    <CustomStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    ></CustomStepIconRoot>
  );
}

// Main stepper component
const StepperComponent = () => {
  // Define the steps with labels, dates, and times
  const steps = [
    { label: "Order Confirmed", date: "Tue, 24th Dec", time: "at 6:12 AM" },
    { label: "Shipped", date: "", time: "" },
    { label: "Out For Delivery", date: "", time: "" },
    { label: "Delivered", date: "Expected by, Mon 30th", time: "" },
  ];

  const activeStep = 2; // 0-based index, so 2 means the third step is active

  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<CustomConnector />}
      sx={{ width: "100%", maxWidth: 800 }}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel StepIconComponent={CustomStepIcon}>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {step.label} {/* Display step label */}
            </Typography>
            {step.date && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                {step.date} {/* Display step date if available */}
                {step.time && (
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block" }}
                  >
                    {step.time} {/* Display step time if available */}
                  </Typography>
                )}
              </Typography>
            )}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperComponent;