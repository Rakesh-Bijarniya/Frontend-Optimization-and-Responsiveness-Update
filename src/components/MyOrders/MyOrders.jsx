import React, { useState, useCallback } from "react"; // Import useCallback for memoization
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// FilterModal component to filter orders based on status and time frame
const FilterModal = ({ open, onClose, onApplyFilters }) => {
  // State management for filters
  const [status, setStatus] = useState("All"); // Default status filter
  const [timeFrame, setTimeFrame] = useState("Anytime"); // Default time frame filter

  // Memoize handlers to prevent unnecessary re-renders
  const handleStatusChange = useCallback((event) => {
    setStatus(event.target.value); // Update status state when a new option is selected
  }, []);

  const handleTimeFrameChange = useCallback((event) => {
    setTimeFrame(event.target.value); // Update time frame state when a new option is selected
  }, []);

  const handleClearFilters = useCallback(() => {
    setStatus("All"); // Reset status to default
    setTimeFrame("Anytime"); // Reset time frame to default
  }, []);

  const handleApply = useCallback(() => {
    onApplyFilters({ status, timeFrame }); // Pass the selected filters to the parent component
    onClose(); // Close the modal after applying filters
  }, [onApplyFilters, onClose, status, timeFrame]);

  return (
    <Dialog
      open={open} // Control the open state of the dialog
      onClose={onClose} // Close the dialog when the backdrop is clicked or the close button is pressed
      fullWidth // Make the dialog take the full width of the screen
      maxWidth="xs" // Set the maximum width of the dialog
      PaperProps={{
        sx: {
          borderRadius: "12px", // Rounded corners for the dialog
          m: 2, // Margin around the dialog
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1, // Padding bottom for spacing
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filter Orders
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Status
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup value={status} onChange={handleStatusChange}>
              {["All", "Delivered", "Cancelled", "Returned", "On the way"].map((value) => (
                <FormControlLabel
                  key={value} // Unique key for each option
                  value={value} // Value for the radio button
                  control={<Radio sx={{ color: "#455F76" }} />} // Custom color for the radio button
                  label={value} // Label for the radio button
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider sx={{ my: 2 }} /> {/* Divider between sections */}

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Time
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup value={timeFrame} onChange={handleTimeFrameChange}>
              {["Anytime", "Last 30 days", "Last 6 months", "Last year"].map((value) => (
                <FormControlLabel
                  key={value} // Unique key for each option
                  value={value} // Value for the radio button
                  control={<Radio sx={{ color: "#455F76" }} />} // Custom color for the radio button
                  label={value} // Label for the radio button
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 2 }}>
        <Button
          onClick={handleClearFilters} // Clear filters when clicked
          sx={{
            flex: 1,
            color: "#455F76",
            border: "1px solid #455F76",
            "&:hover": {
              border: "1px solid #455F76",
              backgroundColor: "rgba(69, 95, 118, 0.04)",
            },
          }}
          variant="outlined"
        >
          Clear Filters
        </Button>
        <Button
          onClick={handleApply} // Apply filters when clicked
          sx={{
            flex: 1,
            backgroundColor: "#FF944E",
            color: "white",
            "&:hover": {
              backgroundColor: "#ff7043",
            },
          }}
          variant="contained"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;