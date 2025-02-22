import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { PROD_IMG_FUNC } from "../../../BaseUrl";

// ProductDetail component to display detailed information about a product
function ProductDetail({ product }) {
  const [variant, setVariant] = useState(null); // State to store the selected product variant

  // Effect to determine and set the appropriate product variant
  useEffect(() => {
    if (product) {
      // Find the variant that matches the product's variantId
      const ReqVariant = product?.ProductVariants?.find((vars) => {
        return vars.id === product.variantId;
      });
      // If no matching variant is found, default to the first variant
      if (!ReqVariant) {
        setVariant(product?.ProductVariants[0]);
      } else {
        setVariant(ReqVariant);
      }
    }
  }, [product]);

  // Function to round a number to one decimal place
  const round = (num) => {
    return Math.round(num * 10) / 10;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        flex: "0 0 396px", // Fixed width for the component
        p: 3,
        backgroundColor: "#EEF5FA",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            padding: 2.5,
            height: 350,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Display product image */}
          <img
            src={
              PROD_IMG_FUNC(product?.User?.secure_id) +
              product?.thumbnail_image_url
            }
            alt="product"
            style={{ height: "100%" }}
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", paddingX: 1, gap: 1 }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            {product?.Brand?.name} {/* Display brand name */}
          </Typography>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "medium", lineHeight: "24px" }}
          >
            {product?.product_name} {/* Display product name */}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "baseline", gap: 2, paddingX: 1 }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "28px" }}>
            ₹{variant?.iz_price} {/* Display variant price */}
          </Typography>
          <Typography sx={{ color: "#FF944E" }}>
            {product &&
              round(
                ((product?.tag_price - variant?.iz_price) * 100) /
                  product?.tag_price
              )}
            % off {/* Calculate and display discount percentage */}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 1 }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{
              textTransform: "none",
              bgcolor: "#FF944E",
              height: 48,
              fontSize: "18px",
            }}
          >
            View Product
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              textTransform: "none",
              color: "#E57329",
              height: 48,
              fontSize: "18px",
              fontWeight: "medium",
            }}
          >
            Reorder Product
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProductDetail;