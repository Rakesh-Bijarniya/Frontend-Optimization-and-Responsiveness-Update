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
  const [status, setStatus] = useState("All");
  const [timeFrame, setTimeFrame] = useState("Anytime");

  // Memoize handlers to prevent unnecessary re-renders
  const handleStatusChange = useCallback((event) => {
    setStatus(event.target.value); // Update status state
  }, []);

  const handleTimeFrameChange = useCallback((event) => {
    setTimeFrame(event.target.value); // Update time frame state
  }, []);

  const handleClearFilters = useCallback(() => {
    setStatus("All"); // Reset status to default
    setTimeFrame("Anytime"); // Reset time frame to default
  }, []);

  const handleApply = useCallback(() => {
    onApplyFilters({ status, timeFrame }); // Apply filters and close modal
    onClose();
  }, [onApplyFilters, onClose, status, timeFrame]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
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
                  key={value}
                  value={value}
                  control={<Radio sx={{ color: "#455F76" }} />}
                  label={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Time
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup value={timeFrame} onChange={handleTimeFrameChange}>
              {["Anytime", "Last 30 days", "Last 6 months", "Last year"].map((value) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio sx={{ color: "#455F76" }} />}
                  label={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 2 }}>
        <Button
          onClick={handleClearFilters}
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
          onClick={handleApply}
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