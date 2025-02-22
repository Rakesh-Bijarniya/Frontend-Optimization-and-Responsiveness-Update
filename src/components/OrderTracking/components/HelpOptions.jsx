import React from "react";
import { Box, Button, List, ListItem, Paper } from "@mui/material";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CallMadeIcon from "@mui/icons-material/CallMade";

// HelpOptions component to provide various customer support actions
const HelpOptions = ({
  isDelivered, // Boolean indicating if the order is delivered
  onReturnOrder, // Function to handle order return
  onFeedback, // Function to handle feedback
  onChat, // Function to initiate chat
  onNotHappy, // Function to handle dissatisfaction
  isCancelled, // Boolean indicating if the order is cancelled
  setIsCancelledModalOpen, // Function to open the cancellation modal
}) => {
  // Common styles for buttons
  const buttonStyle = {
    justifyContent: "flex-start",
    textTransform: "none",
    color: "#455F76",
    fontSize: { xs: "14px", sm: "16px" }, // Responsive font size
    fontWeight: "regular",
    p: 0,
    minHeight: 40,
    width: "100%",
  };

  // Styles for icons
  const iconStyle = {
    fontSize: 20,
  };

  // Styles for arrow icons
  const arrowStyle = {
    marginLeft: "3px",
    fontSize: 16,
  };

  console.log("delivery info is ", isCancelled); // Debugging log

  return (
    <Paper elevation={0}>
      <List sx={{ p: 0 }}>
        {isDelivered ? (
          <>
            <ListItem disablePadding>
              <Button onClick={onNotHappy} sx={buttonStyle}>
                {/* SVG icon for "Not happy with Product?" */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG paths */}
                </svg>
                <Box sx={{ ml: 1 }}>Not happy with Product?</Box>
                <CallMadeIcon sx={arrowStyle} />
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button onClick={onChat} sx={buttonStyle}>
                {/* SVG icon for "Chat with us" */}
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG paths */}
                </svg>
                <Box sx={{ ml: 1 }}>Chat with us</Box>
                <CallMadeIcon sx={arrowStyle} />
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button onClick={onFeedback} sx={buttonStyle}>
                {/* SVG icon for "Give your feedback" */}
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG paths */}
                </svg>
                <Box sx={{ ml: 1 }}>Give your feedback</Box>
                <CallMadeIcon sx={arrowStyle} />
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button
                disabled
                onClick={onReturnOrder}
                sx={{ ...buttonStyle, color: "#D2D2D2" }} // Disabled style
              >
                <BlockOutlinedIcon sx={iconStyle} />
                <Box sx={{ ml: 1 }}>Cancel Order</Box>
                <CallMadeIcon sx={arrowStyle} />
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <Button onClick={onChat} sx={buttonStyle}>
                {/* SVG icon for "Chat with us" */}
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG paths */}
                </svg>
                <Box sx={{ ml: 1 }}>Chat with us</Box>
                <CallMadeIcon sx={arrowStyle} />
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button
                onClick={() => setIsCancelledModalOpen(true)}
                disabled={isCancelled} // Disable if already cancelled
              >
                <BlockOutlinedIcon sx={iconStyle} />
                <Box sx={{ ml: 1 }}>Cancel Order</Box>
                <CallMadeIcon sx={arrowStyle} />
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Paper>
  );
};

export default HelpOptions;