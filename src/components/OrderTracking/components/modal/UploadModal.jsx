import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// UploadModal component for uploading images and videos
const UploadModal = ({
  openModal, // Boolean to control the open state of the modal
  handleCloseModal, // Function to close the modal
  uploadImage, // Image to display in the modal
  onFilesSelect, // Callback function to handle selected files
  existingFiles, // Pre-existing files to be displayed
}) => {
  const [isDragging, setIsDragging] = useState(false); // State to track drag-and-drop status
  const [files, setFiles] = useState([]); // State to store selected files

  // Effect to set files when the modal opens and existing files are provided
  useEffect(() => {
    if (openModal && existingFiles) {
      setFiles(existingFiles);
    }
  }, [openModal, existingFiles]);

  // Handlers for drag-and-drop functionality
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true); // Set dragging state to true
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false); // Set dragging state to false
  }, []);

  // Function to handle file selection
  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Add new files to the existing list
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files); // Handle files dropped into the drop zone
  }, []);

  const handleFileSelect = useCallback((e) => {
    handleFiles(e.target.files); // Handle files selected via file input
  }, []);

  // Function to handle upload action
  const handleUpload = () => {
    onFilesSelect(files); // Pass selected files to the parent component
    handleCloseModal(); // Close the modal
  };

  // Function to clear selected files
  const handleClearSelection = () => {
    setFiles([]); // Clear the files state
  };

  // Function to get text for file selection status
  const getFileSelectionText = () => {
    if (files.length === 0) return null;
    if (files.length === 1) return "1 file selected";
    return `${files.length} files selected`;
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          maxWidth: "600px",
          width: "90%",
          margin: "16px",
          paddingX: "24px",
          paddingY: "16px",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <DialogTitle>
        Upload Photos & Videos
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          border: "none",
          background: `
            linear-gradient(90deg, #ccc 50%, transparent 50%) repeat-x,
            linear-gradient(90deg, #ccc 50%, transparent 50%) repeat-x,
            linear-gradient(0deg, #ccc 50%, transparent 50%) repeat-y,
            linear-gradient(0deg, #ccc 50%, transparent 50%) repeat-y
          `,
          backgroundSize: "16px 1px, 16px 1px, 1px 16px, 1px 16px",
          backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
          borderRadius: 1,
          mx: 3,
          mb: 2,
          p: "14px !important",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          component="label"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            display: "block",
            textAlign: "center",
            cursor: "pointer",
            py: 2,
            bgcolor: isDragging ? "grey.50" : "background.paper",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <input
            type="file"
            hidden
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="img"
              src={uploadImage}
              alt="Upload"
              sx={{ width: 80, height: 80, mb: 1 }}
            />
            <Typography>
              Drop your image & video here, or
              <Typography
                sx={{
                  display: "inline",
                  color: "#1F4690",
                  cursor: "pointer",
                }}
              >
                {" "}
                browse
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supports: PNG, JPG & MP4
            </Typography>
            {files.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontWeight: "medium",
                    mb: 1,
                  }}
                >
                  {getFileSelectionText()}
                </Typography>
                <Button
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClearSelection();
                  }}
                >
                  Clear Selection
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={files.length === 0} // Disable upload button if no files are selected
          sx={{
            bgcolor: "#FF7A59",
            "&:hover": {
              bgcolor: "#FF6B47",
            },
            height: 40,
            px: 4,
          }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;