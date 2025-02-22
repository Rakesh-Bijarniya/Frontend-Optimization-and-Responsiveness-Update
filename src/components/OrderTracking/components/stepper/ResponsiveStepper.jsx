import { styled } from "@mui/material/styles";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomStepper = styled(Stepper)(({ isMobile }) => ({
  "--stepper-base-unit": "1rem",
  "--stepper-dot-size": "calc(var(--stepper-base-unit) * 1.25)",
  "--stepper-line-height": "calc(var(--stepper-base-unit) * 0.45)",
  "--stepper-spacing": "calc(var(--stepper-base-unit) * 0.5)",
  "--stepper-primary-color": "#8CB89F",
  "--stepper-secondary-color": "#EAEAF0",
  "--stepper-text-color": "#455F76",
  "--stepper-inactive-dot-color": isMobile ? "#455F76" : "#BABABA",

  width: "100%",
  position: "relative",
  ...(isMobile && {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "var(--stepper-base-unit)",
  }),

  "& .MuiStepConnector-line": {
    height: isMobile ? "5.5em" : "var(--stepper-line-height)",
    width: isMobile ? "var(--stepper-line-height)" : "205%",
    border: "none",
    backgroundColor: "var(--stepper-secondary-color)",
    position: "absolute",
    transition: "background-color 0.3s ease",
    ...(isMobile
      ? {
          left: "calc(var(--stepper-dot-size) / 10 - var(--stepper-line-height) / 1)",
          top: "-1.77em",
        }
      : {
          top: "calc(var(--stepper-dot-size) / 1.51 - var(--stepper-line-height) / 2)",
          left: "-4rem",
          "@media (min-width: 1441px)": {
            width: "180%",
            left: "-4.5rem",
          },
          "@media (max-width: 1440px)": {
            width: "205%",
            left: "-4rem",
          },
          "@media (max-width: 1200px)": {
            width: "220%",
            left: "-3.2rem",
          },
          "@media (max-width: 1024px)": {
            width: "257%",
            left: "-3.3rem",
          },
          "@media (max-width: 950px)": {
            width: "300%",
            left: "-3.2rem",
          },
          "@media (max-width: 899px)": {
            width: "200%",
            left: "-3.2rem",
          },
          "@media (max-width: 700px)": {
            width: "259%",
            left: "-3.8rem",
          },
          "@media (max-width: 600px)": {
            width: "200%",
            left: "-3.8rem",
          },
        }),
  },

  // Remove any styles that might hide the last connector
  "& .MuiStepConnector-root:last-child .MuiStepConnector-line": {
    display: "block !important",
    ...(isMobile && {
      height: "5.5em",
    }),
  },

  // Ensure active/completed states work for all connectors including the last one
  "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line, & .MuiStepConnector-root.Mui-completed .MuiStepConnector-line":
    {
      backgroundColor: "var(--stepper-primary-color)",
      display: "block !important",
    },

  ...(isMobile
    ? {}
    : {
        // pink
        ".MuiStepConnector-root:nth-of-type(6) .MuiStepConnector-line": {
          "@media (min-width: 1441px)": {
            width: "230%",
          },
          "@media (max-width: 1440px)": {
            width: "235%",
          },
          "@media (max-width: 1200px)": {
            width: "240%",
          },
          "@media (max-width: 1024px)": {
            width: "257%",
          },
          "@media (max-width: 950px)": {
            width: "300%",
          },
          "@media (max-width: 899px)": {
            width: "190%",
          },
        },
        // red
        ".MuiStepConnector-root:nth-of-type(4) .MuiStepConnector-line": {
          "@media (min-width: 1441px)": {
            width: "200%",
          },
          "@media (max-width: 1440px)": {
            width: "205%",
          },
          "@media (max-width: 1264px)": {
            width: "210%",
            left: "-3.2rem",
          },
          "@media (max-width: 1200px)": {
            width: "250%",
            left: "-3rem",
          },
          "@media (max-width: 1070px)": {
            width: "277%",
            left: "-2rem",
          },
          "@media (max-width: 946px)": {
            width: "287%",
            left: "-1.5rem",
          },
          "@media (max-width: 900px)": {
            width: "350%",
            left: "-3rem",
          },
          "@media (max-width: 700px)": {
            width: "250%",
            left: "-2rem",
          },
        },
        // black
        ".MuiStepConnector-root:nth-of-type(2) .MuiStepConnector-line": {
          "@media (min-width: 1441px)": {
            width: "200%",
          },
          "@media (max-width: 1440px)": {
            width: "205%",
          },
          "@media (max-width: 1264px)": {
            width: "210%",
            left: "-3.2rem",
          },
          "@media (max-width: 1200px)": {
            width: "250%",
            left: "-3.5rem",
          },
          "@media (max-width: 1070px)": {
            width: "277%",
            left: "-4rem",
          },
          "@media (max-width: 946px)": {
            width: "287%",
            left: "-3.5rem",
          },
          "@media (max-width: 900px)": {
            width: "350%",
            left: "-3.5rem",
          },
          "@media (max-width: 700px)": {
            width: "250%",
            left: "-3.5rem",
          },
        },
      }),

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

const StepDot = styled("div")(({ active, completed, isMobile }) => ({
  width: "var(--stepper-dot-size)",
  height: "var(--stepper-dot-size)",
  borderRadius: "50%",
  backgroundColor:
    active || completed
      ? "var(--stepper-primary-color)"
      : "var(--stepper-inactive-dot-color)",
  border: `0.125em solid ${
    active || completed
      ? "var(--stepper-primary-color)"
      : "var(--stepper-secondary-color)"
  }`,
}));

const ResponsiveStepper = ({
  steps,
  activeStep,
  primaryColor,
  secondaryColor,
  baseUnit = "1rem",
  inactiveDotColor,
  isDelivered,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const rootStyle = {
    "--stepper-base-unit": baseUnit,
    "--stepper-primary-color": primaryColor,
    "--stepper-secondary-color": secondaryColor,
    "--stepper-text-color": isMobile ? "#2A2A2A" : "#6B7280",
    "--stepper-inactive-dot-color": isMobile ? "#455F76" : inactiveDotColor,
  };

  const StepIconComponent = ({ active, completed }) => (
    <StepDot active={active} completed={completed} isMobile={isMobile} />
  );

  return (
    <div style={rootStyle}>
      <CustomStepper
        activeStep={activeStep}
        orientation={isMobile ? "vertical" : "horizontal"}
        isMobile={isMobile}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={StepIconComponent}
              className={index === 1 ? "middle-step" : ""}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </CustomStepper>
    </div>
  );
};

export default ResponsiveStepper;
