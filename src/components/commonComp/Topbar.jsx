import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  MenuItem,
  Button,
  Menu,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Box, styled, keyframes } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocalstorageService from "../../utils/helpers/localstorage-services";

// Define keyframes for the gradient animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  padding: "0",
  margin: "0",
  position: "sticky",
  top: "0px",
  left: "0px",
  width: "100%",
  background: "linear-gradient(270deg,rgb(122, 178, 58), #feb47b,rgb(241, 242, 242))",
  backgroundSize: "400% 400%",
  color: theme.palette.customBg.contrastText,
  borderBottom: "2px solid #E6EDFF",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    animation: `${gradientAnimation} 3s ease infinite`,
  },
}));

const Topbar = ({ mobileOpen, setMobileOpen, lightColor, mainColor, currentLink }) => {
  const location = useLocation();
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const navigate = useNavigate();

  // handle Logout
  const handleLogout = () => {
    LocalstorageService.logoutUser();
    navigate('/login');
  };

  // Notification menu handlers
  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  // Language menu handlers
  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  // User menu handlers
  const handleUserClick = (event) => {
    setUserAnchor(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchor(null);
  };

  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBarStyled elevation={0} sx={{ py: 1 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, paddingBottom: { xs: "0.6rem", md: "0px" } }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "primary.main" }}
            fontWeight={700}
          >
            {currentLink}
          </Typography>
        </Box>

        <IconButton
          sx={{
            backgroundColor: lightColor,
            color: mainColor,
            margin: "0 10px",
          }}
        >
          <Badge variant="dot" badgeContent={0} color="warning">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
        >
          <MenuItem onClick={handleNotificationClose}>
            <a
              href="/notifications/1"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Notification 1
            </a>
          </MenuItem>
          <MenuItem onClick={handleNotificationClose}>
            <a
              href="/notifications/2"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Notification 2
            </a>
          </MenuItem>
        </Menu>

        <Button
          onClick={handleLanguageClick}
          sx={{
            backgroundColor: lightColor,
            color: mainColor,
            textTransform: "none",
            borderRadius: "25px",
            margin: "0 10px",
            display: {
              xs: "none",
              md: "inherit",
            },
          }}
          endIcon={<ArrowDropDownIcon />}
        >
          Eng
        </Button>
        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={handleLanguageClose}
          disableScrollLock
        >
          <MenuItem onClick={handleLanguageClose}>Eng</MenuItem>
          <MenuItem onClick={handleLanguageClose}>Hin</MenuItem>
        </Menu>

        <IconButton onClick={handleUserClick}>
          <Avatar>A</Avatar>
        </IconButton>
        <Menu
          anchorEl={userAnchor}
          open={Boolean(userAnchor)}
          onClose={handleUserClose}
          disableScrollLock
        >
          <MenuItem onClick={handleUserClose}>View Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <Typography
          variant="body1"
          sx={{
            ml: 1,
            fontSize: "16px",
            color: "#3F59A3",
            fontWeight: "600",
            display: { xs: "none", md: "block" },
          }}
        >
          Mr. Tanveer
          <Typography sx={{ fontSize: "14px", color: "text.primary" }}>
            Admin
          </Typography>
        </Typography>
      </Toolbar>
    </AppBarStyled>
  );
};

export default Topbar;