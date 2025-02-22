import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { post } from "../../../../services"; // Import post function for API calls
import { IN_ORDERS } from "../../../../BaseUrl"; // Import base URL for orders
import { toast } from "react-toastify"; // Import toast for notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// CancelModal component to confirm order cancellation
const CancelModal = ({
  orderId, // ID of the order to be cancelled
  open, // Boolean to control the open state of the modal
  onClose, // Function to close the modal
  onConfirm, // Function to confirm cancellation (not used in this code)
  cancelImg, // Image to display in the modal
  productOrderId, // ID of the product order
  setIsCancelled, // Function to update cancellation state
  setIsCancelledModalOpen, // Function to control modal open state
}) => {

  const navigate = useNavigate(); // Hook for navigation

  // Function to handle order cancellation
  const handleCancelOrder = () => {
    const payload = {
      "order_id": productOrderId, // Payload for the API request
    };

    // API call to cancel the order
    post(IN_ORDERS + "cancel-order", payload)
      .then((res) => {
        const { data } = res;
        // Update state to reflect cancellation
        setIsCancelledModalOpen(false);
        setIsCancelled(true);
        toast.success("Order cancelled successfully"); // Show success notification
      })
      .catch((e) => {
        // Handle errors
        if (e?.response?.status === 401) {
          toast.error("Please login to continue"); // Show error for unauthorized access
        } else {
          toast.error("Something went wrong please try again later"); // Show generic error
        }
        setIsCancelledModalOpen(false); // Close the modal on error
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ padding: 6, textAlign: "center" }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "#ff9999" }}>
            <img width={135} src={cancelImg} alt="Cancel" /> {/* Display cancel image */}
          </Typography>
        </Box>

        <DialogTitle
          sx={{
            p: 0,
            mb: 1,
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
        >
          Do you really want to cancel the product? {/* Confirmation message */}
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Typography variant="body2" color="##212121">
            Order ID:
            <Typography
              component="span"
              sx={{ fontSize: "18px", fontWeight: 500 }}
            >
              {" "}
              {orderId} {/* Display order ID */}
            </Typography>
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "space-between",
            px: 0,
            pt: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={onClose} // Close the modal without cancelling
            sx={{
              flex: 1,
              mr: 1,
              bgcolor: "#ff9966",
              "&:hover": {
                bgcolor: "#ff8533",
              },
            }}
          >
            No
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancelOrder} // Confirm cancellation
            sx={{
              flex: 1,
              ml: 1,
              color: "text.primary",
              borderColor: "divider",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CancelModal;