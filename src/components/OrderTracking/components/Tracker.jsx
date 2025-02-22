import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, Collapse } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ResponsiveStepper from "./stepper/ResponsiveStepper";
import CancelledStepper from "./stepper/CancelledStepper";
import StepperProgress from "./stepper/StepperProgress";

const steps = ["Order Confirmed","Shipped","In Transit", "Out For Delivery", "Delivered"];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "0 24px",
  backgroundColor: "#fff",
  borderRadius: "12px",
}));

export default function Tracker({
  trackingData,
  isCancelled,
  isDelivered,
  activeStep,
  setActiveStep,
  trackingStatus,
  isMobile,
}) {
  const [expanded, setExpanded] = useState(false);
  const [step, setStep] = useState(0);
  const [trackingDetails,setTrackingDetails]=useState(null);
  

   const statusCodeStep={
        "CAN":0,
        "PP":0,
        "IT":2,
        "EX":2,
        "OFD":3,
        "DL":4,
        "RT":"RTO",
        "RT-IT":"RTO In Transit",
        "RT-DL":"RTO Delivered",

    }

    const statusMessage={
      "CAN":"Order cancelled",
      "PP":"Pending Pickup",
      "IT":"In Transit",
      "EX":"Exception",
      "OFD":"Out For Delivery",
      "DL":"Delivered",
      "RT":"Return Requested",
      "RT-IT":"RTO In Transit",
      "RT-DL":"RTO Delivered",
    }

   const orderStepsArr= ["Order Confirmed", "Shipped", "In Transit", "Out For Delivery", "Delivered"];
   const CancelStepsArr= ["Order Confirmed","Cancelled"];

    

  const formatDate = (dateString) => {
    let formattedDate;

    if (dateString?.includes("-")) {
      const parts = dateString.split("-");
      
      if (parts[0].length === 4) {
        // YYYY-MM-DD format
        formattedDate = new Date(parts[0], parts[1] - 1, parts[2]);
      } else {
        // DD-MM-YYYY format
        formattedDate = new Date(parts[2], parts[1] - 1, parts[0]);
      }
    } else {
      return "Invalid Date Format";
    }
  
    if (isNaN(formattedDate)) return "Invalid Date";
  
    const options = { day: "numeric",year: 'numeric', month: "short", weekday: "long" };
    const dateStringFormatted = formattedDate.toLocaleDateString("en-US", options);
    
    const [weekday, dayMonth,year] = dateStringFormatted.split(", ");
    return `${dayMonth}, ${year}`;
  };

  function formatedDeliveryTime(datetime) {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {
        // weekday: 'long', // e.g., Friday
        year: 'numeric', // e.g., 2025
        month: 'short', // e.g., January
        day: 'numeric', // e.g., 31
        hour: '2-digit', // e.g., 1 PM
        minute: '2-digit', // e.g., 22
        hour12: true // Convert to 12-hour format with AM/PM
    });
}

  useEffect(()=>{
    
    if(trackingStatus){
      const history=trackingStatus?.history;
      const latestTrackStep=history[history.length-1];

      const latestStep=statusCodeStep[latestTrackStep.status_code];
      if(latestStep)setStep(latestStep);



    }

  },[trackingStatus]);

  return (
    <StyledPaper elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          p:1,
        }}
      >
        <Typography
          sx={{
            fontStyle: "normal",
            fontSize: { xs: "23px", sm: "28px" },
            fontWeight: "500",
            color: "#111827",
            lineHeight: "34px",
            // textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          Order ID: {trackingStatus?.order_number}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{
            padding: "9px 14px",
            textTransform: "none",
            borderColor: "#455F76",
            color: "#6B7280",
            "&:hover": {
              borderColor: "#D1D5DB",
              backgroundColor: "transparent",
            },
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8872 15.433H5.72763C3.37359 15.433 2.01921 14.0786 2.01921 11.7246V5.27519C2.01921 2.92115 3.37359 1.56677 5.72763 1.56677H10.8872C13.2412 1.56677 14.5956 2.92115 14.5956 5.27519V11.7246C14.5956 14.0786 13.2412 15.433 10.8872 15.433ZM5.72763 2.53418C3.88309 2.53418 2.98662 3.43065 2.98662 5.27519V11.7246C2.98662 13.5691 3.88309 14.4656 5.72763 14.4656H10.8872C12.7317 14.4656 13.6282 13.5691 13.6282 11.7246V5.27519C13.6282 3.43065 12.7317 2.53418 10.8872 2.53418H5.72763Z"
              fill="#455F76"
            />
            <path
              d="M12.4995 6.72638H11.2096C10.2293 6.72638 9.43604 5.9331 9.43604 4.95279V3.66291C9.43604 3.39848 9.65532 3.1792 9.91974 3.1792C10.1842 3.1792 10.4034 3.39848 10.4034 3.66291V4.95279C10.4034 5.3978 10.7646 5.75897 11.2096 5.75897H12.4995C12.7639 5.75897 12.9832 5.97825 12.9832 6.24267C12.9832 6.5071 12.7639 6.72638 12.4995 6.72638Z"
              fill="#455F76"
            />
            <path
              d="M8.3074 9.62855H5.72763C5.46321 9.62855 5.24393 9.40927 5.24393 9.14484C5.24393 8.88041 5.46321 8.66113 5.72763 8.66113H8.3074C8.57183 8.66113 8.79111 8.88041 8.79111 9.14484C8.79111 9.40927 8.57183 9.62855 8.3074 9.62855Z"
              fill="#455F76"
            />
            <path
              d="M10.8872 12.2083H5.72763C5.46321 12.2083 5.24393 11.989 5.24393 11.7246C5.24393 11.4601 5.46321 11.2408 5.72763 11.2408H10.8872C11.1516 11.2408 11.3709 11.4601 11.3709 11.7246C11.3709 11.989 11.1516 12.2083 10.8872 12.2083Z"
              fill="#455F76"
            />
          </svg>
          Invoice
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, sm: 2 },
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          mb: { xs: 1, sm: 1 },
        }}
      >
        {/* <Box>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#6B7280",
              fontWeight: "regular",
              mb: 0.5,
            }}
          >
            Order date:{" "}
            <span
              style={{
                fontSize: "18px",
                color: "#111827",
                fontWeight: "semibold",
              }}
            >
              {trackingData.orderConfirmedDate}
            </span>
          </Typography>
        </Box> */}
        {
              !isCancelled&&(
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "#FF944E",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.66667 9.83329H1.33333C1.06 9.83329 0.833334 9.60663 0.833334 9.33329V5.07996C0.833334 4.86662 0.966661 4.67994 1.15999 4.60661C1.35999 4.53327 1.58001 4.5933 1.71334 4.7533C2.12001 5.23996 2.75334 5.51329 3.38001 5.49329C3.91334 5.47995 4.40666 5.27997 4.77999 4.92664C4.95332 4.77997 5.09333 4.60662 5.19999 4.41329C5.40666 4.05996 5.50667 3.67328 5.5 3.27995C5.48667 2.66661 5.22002 2.10662 4.76668 1.69995C4.60668 1.55995 4.55334 1.33994 4.62667 1.14661C4.7 0.953273 4.88668 0.819946 5.09334 0.819946H10C10.2733 0.819946 10.5 1.04661 10.5 1.31995V7.98661C10.5 9.01328 9.68 9.83329 8.66667 9.83329ZM1.83333 8.83329H8.66667C9.12667 8.83329 9.5 8.45996 9.5 7.99996V1.83329H6.12667C6.36 2.26663 6.48667 2.7533 6.5 3.25997C6.51333 3.83997 6.36666 4.41329 6.07332 4.91329C5.91332 5.19996 5.69333 5.4733 5.45333 5.6733C4.92 6.17997 4.18666 6.47996 3.40666 6.49996C2.84666 6.51996 2.30667 6.37996 1.84001 6.12663V8.83329H1.83333Z"
              fill="#FF944E"
            />
            <path
              d="M12.6667 13.8333H12C11.7267 13.8333 11.5 13.6066 11.5 13.3333C11.5 12.8733 11.1267 12.4999 10.6667 12.4999C10.2067 12.4999 9.83333 12.8733 9.83333 13.3333C9.83333 13.6066 9.60667 13.8333 9.33333 13.8333H6.66667C6.39333 13.8333 6.16667 13.6066 6.16667 13.3333C6.16667 12.8733 5.79333 12.4999 5.33333 12.4999C4.87333 12.4999 4.5 12.8733 4.5 13.3333C4.5 13.6066 4.27333 13.8333 4 13.8333H3.33333C1.95333 13.8333 0.833334 12.7133 0.833334 11.3333V9.33325C0.833334 9.05992 1.06 8.83325 1.33333 8.83325H8.66667C9.12667 8.83325 9.5 8.45992 9.5 7.99992V3.33325C9.5 3.05992 9.72667 2.83325 10 2.83325H11.2267C11.8867 2.83325 12.4933 3.1866 12.82 3.75993L13.96 5.75326C14.0467 5.90659 14.0467 6.09992 13.96 6.25326C13.8733 6.40659 13.7067 6.49992 13.5267 6.49992H12.6667C12.5733 6.49992 12.5 6.57325 12.5 6.66659V8.66658C12.5 8.75992 12.5733 8.83325 12.6667 8.83325H14.6667C14.94 8.83325 15.1667 9.05992 15.1667 9.33325V11.3333C15.1667 12.7133 14.0467 13.8333 12.6667 13.8333ZM12.4333 12.8333H12.6667C13.4933 12.8333 14.1667 12.1599 14.1667 11.3333V9.83325H12.6667C12.0267 9.83325 11.5 9.30658 11.5 8.66658V6.66659C11.5 6.02659 12.02 5.49992 12.6667 5.49992L11.9533 4.25326C11.8067 3.99326 11.5267 3.83325 11.2267 3.83325H10.5V7.99992C10.5 9.01325 9.68 9.83325 8.66667 9.83325H1.83333V11.3333C1.83333 12.1599 2.50667 12.8333 3.33333 12.8333H3.56665C3.78665 12.0666 4.49333 11.4999 5.33333 11.4999C6.17333 11.4999 6.88002 12.0666 7.10002 12.8333H8.90666C9.12666 12.0666 9.83334 11.4999 10.6733 11.4999C11.5133 11.4999 12.2133 12.0666 12.4333 12.8333Z"
              fill="#FF944E"
            />
            <path
              d="M5.33333 15.1667C4.32 15.1667 3.5 14.3467 3.5 13.3333C3.5 12.32 4.32 11.5 5.33333 11.5C6.34667 11.5 7.16667 12.32 7.16667 13.3333C7.16667 14.3467 6.34667 15.1667 5.33333 15.1667ZM5.33333 12.5C4.87333 12.5 4.5 12.8733 4.5 13.3333C4.5 13.7933 4.87333 14.1667 5.33333 14.1667C5.79333 14.1667 6.16667 13.7933 6.16667 13.3333C6.16667 12.8733 5.79333 12.5 5.33333 12.5Z"
              fill="#FF944E"
            />
            <path
              d="M10.6667 15.1667C9.65333 15.1667 8.83333 14.3467 8.83333 13.3333C8.83333 12.32 9.65333 11.5 10.6667 11.5C11.68 11.5 12.5 12.32 12.5 13.3333C12.5 14.3467 11.68 15.1667 10.6667 15.1667ZM10.6667 12.5C10.2067 12.5 9.83333 12.8733 9.83333 13.3333C9.83333 13.7933 10.2067 14.1667 10.6667 14.1667C11.1267 14.1667 11.5 13.7933 11.5 13.3333C11.5 12.8733 11.1267 12.5 10.6667 12.5Z"
              fill="#FF944E"
            />
            <path
              d="M14.6667 9.83333H12.6667C12.0267 9.83333 11.5 9.30667 11.5 8.66667V6.66667C11.5 6.02667 12.0267 5.5 12.6667 5.5H13.5267C13.7067 5.5 13.8733 5.59334 13.96 5.75334L15.1 7.75334C15.14 7.82667 15.1667 7.91333 15.1667 8V9.33333C15.1667 9.60667 14.94 9.83333 14.6667 9.83333ZM12.6667 6.5C12.5733 6.5 12.5 6.57333 12.5 6.66667V8.66667C12.5 8.76 12.5733 8.83333 12.6667 8.83333H14.1667V8.13334L13.2333 6.5H12.6667Z"
              fill="#FF944E"
            />
            <path
              d="M3.32674 6.49996C2.40674 6.49996 1.54007 6.09994 0.953405 5.39994C0.860071 5.29994 0.760083 5.15994 0.673416 5.02661C0.360083 4.55328 0.18675 3.99328 0.173416 3.40662C0.14675 2.43328 0.560091 1.51994 1.30676 0.899943C1.87342 0.433276 2.55339 0.179959 3.27339 0.166626C4.06006 0.173293 4.84676 0.433294 5.43343 0.959961C6.10009 1.54663 6.48675 2.36664 6.50675 3.25997C6.52008 3.83997 6.37341 4.41329 6.08007 4.91329C5.92007 5.19996 5.70008 5.4733 5.46008 5.6733C4.92674 6.17996 4.19341 6.47996 3.41341 6.49996C3.38007 6.49996 3.3534 6.49996 3.32674 6.49996ZM3.32674 1.16663C3.3134 1.16663 3.30007 1.16663 3.28674 1.16663C2.80007 1.17329 2.33339 1.3533 1.94006 1.6733C1.43339 2.0933 1.15341 2.71996 1.16674 3.37996C1.18008 3.77996 1.29342 4.15997 1.50675 4.47331C1.56675 4.56664 1.62673 4.65328 1.70007 4.73328C2.12673 5.23994 2.76008 5.50662 3.38008 5.49329C3.91341 5.47995 4.40673 5.27997 4.78006 4.92664C4.9534 4.77997 5.0934 4.60662 5.20007 4.41329C5.40673 4.05996 5.50674 3.67328 5.50008 3.27995C5.48674 2.66661 5.22009 2.10662 4.76676 1.69995C4.36676 1.35995 3.86007 1.16663 3.32674 1.16663Z"
              fill="#FF944E"
            />
            <path
              d="M2.96659 4.49987C2.83992 4.49987 2.71991 4.45319 2.61991 4.35985L1.94657 3.71988C1.74657 3.52655 1.73993 3.21322 1.93326 3.01322C2.12659 2.81322 2.43993 2.80654 2.63993 2.99987L2.96659 3.31318L4.01326 2.29988C4.21326 2.10654 4.52659 2.11318 4.71992 2.31318C4.91326 2.51318 4.90658 2.82656 4.70658 3.01989L3.31322 4.36653C3.21322 4.45319 3.08659 4.49987 2.96659 4.49987Z"
              fill="#FF944E"
            />
          </svg>

          <Box>
            <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "medium",
                  mb: 0.5,
                }}
              >
                Estimated delivery:{" "}
                <span style={{ fontSize: "16px", fontWeight: "medium" }}>
  
                  {formatDate(trackingStatus?.edd)}
                </span>
              </Typography>
            
            
          </Box>
        </Box>)}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: { xs: "flex" },
          flexDirection: { xs: "row", sm: "column" },
          justifyContent: "center",
          alignItems: "center",
          color: { xs: "#2A2A2A" },
        }}
      >
        <Box
          sx={{
            width: { xs: "58%", sm: "100%" },
            padding: {
              xs: "0 0 0 1rem",
            },
          }}
        >
          {isCancelled ? (
            <>
              <StepperProgress step={1} stepsArr={CancelStepsArr} isCancelled={isCancelled}/>
            </>
          ) : (
            // <ResponsiveStepper
            //   steps={steps}
            //   activeStep={activeStep}
            //   isDelivered={isDelivered}
            //   setActiveStep={setActiveStep}
            // />
            <StepperProgress step={step} isMobile={isMobile} isCancelled={isCancelled}/>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 9.5, sm: 2 },
            visibility: { xs: "hidden", sm: "visible" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: { xs: "#2A2A2A", sm: "#6B7280" },
                lineHeight: 1.5,
                fontWeight: "regular",
              }}
            >
              Ordered on, {formatDate(trackingStatus?.created)}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              color: { xs: "#2A2A2A", sm: "#6B7280" },
              lineHeight: 1.5,
            }}
          >
          {!isCancelled && trackingStatus?.edd &&"Expected by "+  formatDate(trackingStatus?.edd)}
          {isCancelled && trackingStatus?.edd &&"Cancelled on "+ formatedDeliveryTime(trackingStatus?.event_time)}
          </Typography>
        </Box>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Box sx={{ px: 4, pb: 2 }}>

      <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#111827",
                mb: 1,
              }}
            >
              Order Confirmed 
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#6B7280",
                pl: 2,
                mb: 0.5,
              }}
            >
              • Your Order has been placed.
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#6B7280",
                pl: 2,
                mb: 0.5,
              }}
            >
              • {formatDate(trackingStatus?.created)}
            </Typography>
          </Box>
            
        {
          trackingStatus?.history?.map((entry)=>{
            if(entry?.status_code==='CAN'){
              return null;
            }
            return (
              <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#111827",
                mb: 1,
              }}
            >
              {statusMessage[entry?.status_code]}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#6B7280",
                pl: 2,
                mb: 0.5,
              }}
            >
              • {entry?.location}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#6B7280",
                pl: 2,
                mb: 0.5,
              }}
            >
              • {formatedDeliveryTime(entry?.event_time)}
            </Typography>
          </Box>
            )
          })
        }
        </Box>
      </Collapse>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: 4,
          width: "100%",
        }}
      >
        <Button
          onClick={() => setExpanded(!expanded)}
          endIcon={expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          sx={{
            textTransform: "none",
            color: "#6B7280",
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
            textDecoration: "underline",
          }}
        >
          {expanded ? "Hide detailed tracking" : "View detailed tracking"}
        </Button>
      </Box>
    </StyledPaper>
  );
}
