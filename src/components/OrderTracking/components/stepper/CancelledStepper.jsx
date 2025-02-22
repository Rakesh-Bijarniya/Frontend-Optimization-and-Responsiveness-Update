import { styled } from "@mui/material/styles";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Define the steps for the stepper
const steps = ["Order Confirmed", "Cancelled"];

// Custom styled Stepper component
const CustomStepper = styled(Stepper)(({ isMobile }) => ({
  "--stepper-base-unit": "1rem",
  "--stepper-dot-size": "calc(var(--stepper-base-unit) * 1.25)",
  "--stepper-line-height": "calc(var(--stepper-base-unit) * 0.45)",
  "--stepper-spacing": "calc(var(--stepper-base-unit) * 0.5)",
  "--stepper-primary-color": "#8CB89F",
  "--stepper-secondary-color": "#EAEAF0",
  "--stepper-text-color": "#455F76",
  "--stepper-inactive-dot-color": isMobile ? "#455F76" : "#BABABA",
  "--stepper-error-color": "#FF5252",

  width: "130%",
  marginLeft: "-16%",
  position: "relative",
  ...(isMobile && {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "var(--stepper-base-unit)",
    width: "100%",
    marginLeft: 0,
  }),

  "& .MuiStepConnector-line": {
    height: isMobile ? "5.5em" : "var(--stepper-line-height)",
    width: isMobile ? "var(--stepper-line-height)" : "200%",
    border: "none",
    backgroundColor: "var(--stepper-primary-color)",
    position: "absolute",
    ...(isMobile
      ? {
          left: "calc(var(--stepper-dot-size) / 10 - var(--stepper-line-height) / 1)",
          top: "-1.77em",
        }
      : {
          top: "calc(var(--stepper-dot-size) / 1.4 - var(--stepper-line-height) / 2)",
          left: "calc(- 5.5rem)",
          transform: "translateX(-25%)",
          "@media (max-width: 900px)": {
            left: "calc(- 4.5rem)",
          },
          "@media (max-width: 600px)": {
            left: "calc(-10% - 3.5rem)",
          },
        }),
  },

  "& .MuiStepConnector-root": {
    flex: "1 1 auto",
    position: "relative",
    padding: isMobile ? "calc(var(--stepper-dot-size) / 2) 0" : 0,
  },

  "& .MuiStep-root": {
    padding: 0,
    position: "relative",
    flex: 1,
    minHeight: isMobile ? "calc(var(--stepper-dot-size) * 2)" : "auto",
  },

  // Style for the last step's label
  "& .MuiStep-root:last-child .MuiStepLabel-label": {
    color: "var(--stepper-error-color) !important",
  },

  "& .MuiStepLabel-root": {
    flexDirection: isMobile ? "row" : "column-reverse",
    alignItems: isMobile ? "flex-start" : "center",
    gap: isMobile ? "var(--stepper-base-unit)" : 0,
    width: "100%",
    justifyContent: "center",
  },

  "& .MuiStepLabel-iconContainer": {
    padding: 0,
    marginTop: isMobile ? 0 : "calc(var(--stepper-spacing) * -1)",
    zIndex: 1,
  },

  "& .MuiStepLabel-label": {
    whiteSpace: "nowrap",
    height: isMobile ? "auto" : "clamp(1.25rem, 1vw, 1.5rem)",
    marginBottom: isMobile ? 0 : "calc(var(--stepper-spacing) * 2)",
    fontSize: "clamp(0.875rem, 1vw, 1rem)",
    color: "var(--stepper-text-color)",
    textAlign: isMobile ? "left" : "center",
    "&.Mui-active, &.Mui-completed": {
      color: "var(--stepper-text-color)",
    },
  },
}));

// Custom styled component for step dots
const StepDot = styled("div")(
  ({ active, completed, isMobile, isLastStep }) => ({
    width: "var(--stepper-dot-size)",
    height: "var(--stepper-dot-size)",
    borderRadius: "50%",
    backgroundColor: isLastStep
      ? "var(--stepper-error-color)"
      : active || completed
      ? "var(--stepper-primary-color)"
      : "var(--stepper-inactive-dot-color)",
    border: `0.125em solid ${
      isLastStep
        ? "var(--stepper-error-color)"
        : active || completed
        ? "var(--stepper-primary-color)"
        : "var(--stepper-secondary-color)"
    }`,
  })
);

// CancelledStepper component to display the order status
const CancelledStepper = ({
  activeStep, // Current active step
  primaryColor, // Primary color for the stepper
  secondaryColor, // Secondary color for the stepper
  baseUnit = "1rem", // Base unit for sizing
  inactiveDotColor, // Color for inactive dots
}) => {
  const theme = useTheme(); // Hook to access the theme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Determine if the screen size is mobile

  // Root style for the stepper
  const rootStyle = {
    "--stepper-base-unit": baseUnit,
    "--stepper-primary-color": primaryColor,
    "--stepper-secondary-color": secondaryColor,
    "--stepper-text-color": isMobile ? "#2A2A2A" : "#6B7280",
    "--stepper-inactive-dot-color": isMobile ? "#455F76" : inactiveDotColor,
    "--stepper-error-color": "#FF5252",
  };

  // Custom component for step icons
  const StepIconComponent = ({ active, completed, icon }) => {
    const isLastStep = icon === steps.length;
    return (
      <StepDot
        active={active}
        completed={completed}
        isMobile={isMobile}
        isLastStep={isLastStep}
      />
    );
  };

  return (
    <div style={rootStyle}>
      <CustomStepper
        activeStep={activeStep}
        orientation={isMobile ? "vertical" : "horizontal"}
        isMobile={isMobile}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIconComponent}>{label}</StepLabel>
          </Step>
        ))}
      </CustomStepper>
    </div>
  );
};

export default CancelledStepper;