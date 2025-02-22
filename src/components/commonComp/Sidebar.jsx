import React, { useEffect, useState } from 'react';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Slide } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';


const drawerWidth = 270;

// Define keyframes for the background animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    paddingLeft: 3,
    overflowX: "auto",
    background: "linear-gradient(270deg,rgb(35, 93, 83),rgb(122, 178, 58),rgb(235, 228, 226))",
    backgroundSize: "600% 600%",
    animation: `${gradientAnimation} 15s ease infinite`, // Apply the animation
    "&::-webkit-scrollbar": {
      height: "2px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
      borderRadius: "10px",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#cdcdcd transparent",
  },
}));

const Sidebar = ({ sidebarLinks, lightColor, mainColor, setCurrentLink }) => {
  const [openSubmenu, setOpenSubmenu] = useState({});
  const location = useLocation();

  const handleSubmenuToggle = (menu) => {
    setOpenSubmenu((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
  };

  useEffect(() => {
    sidebarLinks.forEach((link) => {
      if (link?.children) {
        const name = link.name;
        setOpenSubmenu((prevState) => {
          return { ...prevState, [name]: false };
        });
      }
    });
  }, [sidebarLinks]);

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      
      <DrawerStyled
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        open
      >
        <div>
          <Box sx={{ width: "100%", py: 3, paddingLeft: 2 }}>
            <Box
              component="img"
              sx={{
                height: "60px",
              }}
              alt="Indiazona."
              src="/logo.svg"
            />
          </Box>

          <List>
            {sidebarLinks.map((link, index) => {
              const IconComponent = link.icon;
              const name = link.name.toLowerCase();
              if (!link?.children) {
                return (
                  <ListItem
                    disablePadding
                    key={link.path}
                    component={NavLink}
                    onClick={() => setCurrentLink(link.name)}
                    to={link.path}
                    sx={{
                      color: location.pathname === link.path ? mainColor : "text.primary",
                      backgroundColor: location.pathname === link.path ? lightColor : "inherit",
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <IconComponent sx={{ color: location.pathname === link.path ? mainColor : "currentColor" }} />
                      </ListItemIcon>
                      <ListItemText primary={link.name} />
                    </ListItemButton>
                  </ListItem>
                );
              } else {
                return (
                  <React.Fragment key={index}>
                    <ListItem
                      disablePadding
                      sx={{
                        color: openSubmenu[name] ? mainColor : "text.primary",
                        backgroundColor: openSubmenu[name] ? "#F6F6F6" : "inherit",
                      }}
                    >
                      <ListItemButton onClick={() => handleSubmenuToggle(name)}>
                        <ListItemIcon>
                          <IconComponent
                            sx={{
                              color: openSubmenu[name] ? mainColor : "inherit",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={link.name} />
                        {openSubmenu[name] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>

                    {link?.children && link.children.map((sublink) => (
                      <Collapse in={openSubmenu[name]} timeout="auto" unmountOnExit key={sublink.path}>
                        <ListItem
                          disablePadding
                          component={NavLink}
                          to={sublink.path}
                          onClick={() => setCurrentLink(link.name)}
                          sx={{
                            color: location.pathname === sublink.path ? mainColor : "text.primary",
                            backgroundColor: location.pathname === sublink.path ? lightColor : "inherit",
                          }}
                        >
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText>
                              <FiberManualRecordIcon sx={{ fontSize: "8px", mb: "1px" }} /> {sublink.name}
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </Collapse>
                    ))}
                  </React.Fragment>
                );
              }
            })}
          </List>
        </div>
      </DrawerStyled>
    </Slide>
  );
};

export default Sidebar;