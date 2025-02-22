import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import UploadModal from "./modal/UploadModal";
import CloseIcon from "@mui/icons-material/Close";
import uploadImage from "./upload.png";
import { styled } from "@mui/system";

const CustomRadio = styled(Radio)({
  color: "#A1A1A1",
  "&.Mui-checked": {
    color: "#FF944E",
  },
});

function ReturnForm({ trackingData }) {
  const [returnType, setReturnType] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(new Set());

  useEffect(() => {
    return () => {
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, []);//for dependencies to only re-render a particular component 

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFilesSelect = async (files) => {
    const newFiles = Array.from(files);
    const tempPreviews = newFiles.map((file) => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
    }));

    setFilePreviews((prev) => [...prev, ...tempPreviews]);

    // Mark all new files as uploading
    const newUploadingFiles = new Set([...uploadingFiles]);
    tempPreviews.forEach((preview) => newUploadingFiles.add(preview.id));
    setUploadingFiles(newUploadingFiles);

    try {
      // Simulate individual file uploads
      await Promise.all(
        newFiles.map(async (file, index) => {
          const previewId = tempPreviews[index].id;

          // Simulate progress updates for each file
          const progressInterval = setInterval(() => {
            setFilePreviews((prev) =>
              prev.map((p) =>
                p.id === previewId
                  ? { ...p, progress: Math.min((p.progress || 0) + 10, 90) }
                  : p
              )
            );
          }, 200);

        

          clearInterval(progressInterval);

          setFilePreviews((prev) =>
            prev.map((p) => (p.id === previewId ? { ...p, progress: 100 } : p))
          );

          // Remove from uploading set after successful upload
          setUploadingFiles((prev) => {
            const next = new Set(prev);
            next.delete(previewId);
            return next;
          });
        })
      );

      setUploadedFiles((prev) => [...prev, ...newFiles]);
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error here
    }
  };

  const handleRemoveFile = (index) => {
    if (filePreviews[index]) {
      URL.revokeObjectURL(filePreviews[index].url);
    }

    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);

    const newPreviews = [...filePreviews];
    newPreviews.splice(index, 1);
    setFilePreviews(newPreviews);
  };

  return (
    <Box sx={{ mx: "auto", p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontStyle: "normal",
            fontSize: { xs: "18px", sm: "28px" },
            fontWeight: "500",
            color: "#111827",
            lineHeight: "34px",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          Order ID:
          <span>{trackingData?.orderId}</span>
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{
            padding: "7px 10px",
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
      <Divider />

      <FormControl component="fieldset" sx={{ width: "100%", mb: 3, mt: 2 }}>
        <RadioGroup
          value={returnType}
          onChange={(e) => setReturnType(e.target.value)}
        >
          <FormControlLabel
            sx={{ mb: 1 }}
            value="return"
            control={<CustomRadio />}
            label="Do you want to return the product? (Applicable within 7 days)"
          />
          <FormControlLabel
            sx={{ mb: 0.3 }}
            value="exchange"
            control={<CustomRadio />}
            label="Do you want to Exchange the product? (Applicable within 7 days)"
          />
          <FormControlLabel
            value="other"
            control={<CustomRadio />}
            label="Any other query chat with us?"
          />
        </RadioGroup>
      </FormControl>

      {returnType && (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Select Reason why you want to return the product
          </Typography>

          <FormControl component="fieldset" sx={{ width: "100%", mb: 3 }}>
            <RadioGroup
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <FormControlLabel
                value="damaged"
                control={<CustomRadio />}
                label="Damaged Product"
              />
              <FormControlLabel
                value="wrong-item"
                control={<CustomRadio />}
                label="Wrong Item Delivered"
              />
              <FormControlLabel
                value="not-as-described"
                control={<CustomRadio />}
                label="Item Not as Described"
              />
              <FormControlLabel
                value="defective"
                control={<CustomRadio />}
                label="Received Defective Product"
              />
              <FormControlLabel
                value="size"
                control={<CustomRadio />}
                label="Size/Fit Issue"
              />
              <FormControlLabel
                value="better-price"
                control={<CustomRadio />}
                label="Better Price Available Elsewhere"
              />
              <FormControlLabel
                value="change-mind"
                control={<CustomRadio />}
                label="Change of Mind"
              />
              <FormControlLabel
                value="other"
                control={<CustomRadio />}
                label="Other (please specify)"
              />
            </RadioGroup>
          </FormControl>

          {reason === "other" && (
            <TextField
              fullWidth
              multiline
              rows={4}
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Please specify your reason"
              sx={{ mb: 3 }}
            />
          )}

          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* For small screens: Other Option > Files > Upload Button > Submit Button */}
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                flexDirection: "column",
                gap: 3,
                width: "100%",
              }}
            >
              {filePreviews.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  {filePreviews.map((file, index) => (
                    <Box
                      key={file.id}
                      sx={{
                        position: "relative",
                        width: 60,
                        height: 60,
                        bgcolor: "grey.100",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      {/* File preview content remains the same */}
                      {uploadingFiles.has(file.id) && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1,
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={file.progress || 0}
                            size={40}
                            thickness={4}
                            sx={{ color: "white" }}
                          />
                        </Box>
                      )}
                      {file.type.startsWith("image/") ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "grey.200",
                          }}
                        >
                          <Typography variant="caption">
                            {file.name.split(".").pop().toUpperCase()}
                          </Typography>
                        </Box>
                      )}
                      <CloseIcon
                        onClick={() => handleRemoveFile(index)}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          cursor: "pointer",
                          fontSize: 16,
                          color: "white",
                          bgcolor: "rgba(0,0,0,0.5)",
                          borderRadius: "50%",
                          p: 0.5,
                          "&:hover": {
                            bgcolor: "rgba(0,0,0,0.7)",
                          },
                          zIndex: 2,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Button
                  onClick={() => setOpenModal(true)}
                  sx={{
                    color: "#FF944E",
                    width: "80%",
                    fontSize: "16px",
                    fontWeight: "500",
                    paddingX: 0,
                    border: "2px solid #FF944E",
                  }}
                >
                  <svg
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2682 17.3333V8.50415L8.42494 11.3208L6.89396 9.74998L12.3618 4.33331L17.8296 9.74998L16.2986 11.3208L13.4553 8.50415V17.3333H11.2682ZM5.8004 21.6666C5.19894 21.6666 4.68424 21.4547 4.25629 21.0307C3.82835 20.6068 3.61401 20.0965 3.61328 19.5V16.25H5.8004V19.5H18.9231V16.25H21.1102V19.5C21.1102 20.0958 20.8963 20.6061 20.4683 21.0307C20.0404 21.4554 19.5253 21.6674 18.9231 21.6666H5.8004Z"
                      fill="#FF944E"
                    />
                  </svg>
                  Upload Proof Images & Videos
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#455F76",
                    width: "120px",
                    height: "40px",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>

            {/* For desktop: Original layout */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setOpenModal(true)}
                  sx={{
                    color: "#FF944E",
                    width: "44%",
                    fontSize: "18px",
                    fontWeight: "500",
                    paddingX: 0,
                    border: "1px solid #FF944E",
                  }}
                >
                  <svg
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2682 17.3333V8.50415L8.42494 11.3208L6.89396 9.74998L12.3618 4.33331L17.8296 9.74998L16.2986 11.3208L13.4553 8.50415V17.3333H11.2682ZM5.8004 21.6666C5.19894 21.6666 4.68424 21.4547 4.25629 21.0307C3.82835 20.6068 3.61401 20.0965 3.61328 19.5V16.25H5.8004V19.5H18.9231V16.25H21.1102V19.5C21.1102 20.0958 20.8963 20.6061 20.4683 21.0307C20.0404 21.4554 19.5253 21.6674 18.9231 21.6666H5.8004Z"
                      fill="#FF944E"
                    />
                  </svg>
                  Upload Proof Images & Videos
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#455F76",
                    width: "178px",
                    height: "48px",
                  }}
                >
                  Submit
                </Button>
              </Box>

              {filePreviews.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {filePreviews.map((file, index) => (
                    // Desktop file preview remains the same
                    <Box
                      key={file.id}
                      sx={{
                        position: "relative",
                        width: 60,
                        height: 60,
                        bgcolor: "grey.100",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      {/* File preview content remains the same */}
                      {uploadingFiles.has(file.id) && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1,
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={file.progress || 0}
                            size={40}
                            thickness={4}
                            sx={{ color: "white" }}
                          />
                        </Box>
                      )}
                      {file.type.startsWith("image/") ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "grey.200",
                          }}
                        >
                          <Typography variant="caption">
                            {file.name.split(".").pop().toUpperCase()}
                          </Typography>
                        </Box>
                      )}
                      <CloseIcon
                        onClick={() => handleRemoveFile(index)}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          cursor: "pointer",
                          fontSize: 16,
                          color: "white",
                          bgcolor: "rgba(0,0,0,0.5)",
                          borderRadius: "50%",
                          p: 0.5,
                          "&:hover": {
                            bgcolor: "rgba(0,0,0,0.7)",
                          },
                          zIndex: 2,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          <UploadModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            uploadImage={uploadImage}
            onFilesSelect={handleFilesSelect}
            existingFiles={uploadedFiles}
          />
        </>
      )}
    </Box>
  );
}

export default ReturnForm;
