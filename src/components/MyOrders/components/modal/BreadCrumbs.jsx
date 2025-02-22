import React from "react";
import {
  Breadcrumbs,
  Link,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

// Memoize the component to prevent unnecessary re-renders
const BreadCrumbs = React.memo(({ items = [], isReturn = false }) => {
  const theme = useTheme();
  const { breakpoints } = theme;
  const navigate = useNavigate();

  // Determine if the current view is mobile based on screen size
  const isMobile = useMediaQuery(breakpoints.down("sm"));

  // Default breadcrumb items
  const defaultItems = [
    { label: "Home", href: "/" },
    { label: "Orders", href: "/myorders" },
  ];

  // Additional item for return pages
  const returnItems = [...defaultItems, { label: "Product Return", href: "#" }];

  // Choose which items to display based on the isReturn prop
  const displayItems = isReturn ? returnItems : defaultItems;

  // Handle click event for breadcrumb links
  const handleClick = (e, href) => {
    e.preventDefault(); // Prevent default link behavior
    navigate(href); // Navigate to the specified href
  };

  return (
    <Breadcrumbs
      // Use a responsive separator icon size
      separator={<NavigateNextIcon fontSize={isMobile ? "small" : "large"} />}
      sx={{
        "& .MuiBreadcrumbs-separator": {
          mx: isMobile ? 0.6 : 1, // Adjust margin based on screen size
        },
      }}
    >
      {displayItems.map((item, index) =>
        // Render the last item as Typography (non-clickable)
        index === displayItems.length - 1 ? (
          <Typography
            key={item.label}
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.9rem" }, // Responsive font size
              whiteSpace: "nowrap", // Prevent text wrapping
            }}
            color="inherit"
          >
            {item.label}
          </Typography>
        ) : (
          // Render other items as clickable links
          <Link
            key={item.label}
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.9rem" }, // Responsive font size
              whiteSpace: "nowrap", // Prevent text wrapping
              cursor: "pointer", // Indicate clickable element
            }}
            underline="hover"
            color="inherit"
            onClick={(e) => handleClick(e, item.href)} // Handle link click
          >
            {item.label}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
});

export default BreadCrumbs;