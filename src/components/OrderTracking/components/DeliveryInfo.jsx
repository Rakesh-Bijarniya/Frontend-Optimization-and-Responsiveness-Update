import React from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HelpOptions from "./HelpOptions"; // Import the HelpOptions component

// DeliveryInfo component to display delivery details and help options
export default function DeliveryInfo({
  deliveryInfo, // Object containing delivery information
  isCancelled, // Boolean indicating if the order is cancelled
  setIsCancelledModalOpen, // Function to open the cancellation modal
  isDelivered, // Boolean indicating if the order is delivered
  onReturnOrder, // Function to handle order return
  onFeedback, // Function to handle feedback
  onChat, // Function to initiate chat
  onNotHappy, // Function to handle dissatisfaction
}) {
  const theme = useTheme(); // Hook to access the theme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Determine if the screen size is mobile

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Responsive layout
      }}
    >
      <Paper
        elevation={0}
        sx={{
          paddingX: { xs: 2, sm: 3 }, // Responsive horizontal padding
          paddingY: { xs: 1, sm: 3 }, // Responsive vertical padding
          flex: 1, // Flex to take equal space
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: { xs: "100%", sm: "80%" }, // Responsive width
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Delivery</Typography>
          <Button
            sx={{
              fontSize: "12px",
              fontWeight: "regular",
              padding: "4px 14px",
              textTransform: "none",
              borderColor: "#D1D5DB",
              color: "#6B7280",
              "&:hover": {
                borderColor: "#455F76",
              },
            }}
            variant="outlined"
          >
            Change
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Address
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "16px" }, // Responsive font size
              fontWeight: "medium",
            }}
          >
            {deliveryInfo?.address}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "medium",
            }}
          >
            {deliveryInfo?.landmark}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "medium",
            }}
          >
            {deliveryInfo?.city?.name}, {deliveryInfo?.state?.name}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "medium",
            }}
          >
            {deliveryInfo?.postal_code}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "medium",
            }}
          >
            Mob: {deliveryInfo?.phone}
          </Typography>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 }, // Responsive padding
          flex: 1, // Flex to take equal space
        }}
      >
        <Typography variant="h6">Need Help</Typography>
        <HelpOptions
          isDelivered={isDelivered}
          isCancelled={isCancelled}
          onReturnOrder={onReturnOrder}
          onFeedback={onFeedback}
          onChat={onChat}
          onNotHappy={onNotHappy}
          setIsCancelledModalOpen={setIsCancelledModalOpen}
        />
      </Paper>
    </Box>
  );
}