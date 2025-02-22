import React, { useEffect, useState } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";

// OrderSummary component to display a summary of the order pricing
function OrderSummary({ summary }) {
  const [pricing, setPricing] = useState({}); // State to store calculated pricing details

  // Effect to calculate and set pricing details when the summary prop changes
  useEffect(() => {
    if (summary) {
      const data = {
        gross_amount: Math.ceil(Number(summary?.gross_amount)), // Round up gross amount
        indiazona_price: Math.ceil(Number(summary?.indiazona_price)), // Round up Indiazona price
        net_amount: Math.ceil(Number(summary?.net_amount)), // Round up net amount
        shipping_charges: Math.ceil(Number(summary?.shipping_charges)), // Round up shipping charges
        tag_price: Math.ceil(Number(summary?.Product?.tag_price)), // Round up tag price
        qty: Math.ceil(Number(summary?.quantity)), // Round up quantity
      };
      setPricing(data); // Update pricing state
    }
  }, [summary]);

  return (
    <Paper elevation={0} sx={{ paddingX: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6">Order Summary</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>MRP</Typography>
            <Typography>
              ₹{pricing?.tag_price} × {pricing?.qty} {/* Display MRP and quantity */}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Discount</Typography>
            <Typography>
              -₹{(pricing?.tag_price * pricing?.qty) - pricing?.net_amount} {/* Calculate and display discount */}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Delivery</Typography>
            <Typography color="success.main">
              {pricing?.delivery ? `₹ ${pricing?.delivery}` : "Free"} {/* Display delivery charges or "Free" */}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold">₹ {pricing?.net_amount} {/* Display total amount */}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default OrderSummary;