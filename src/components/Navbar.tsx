import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Stack,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { customStyle } from "../style/Custom";
import React from "react";

const Navbar = () => {
  return (
    <div >
      <AppBar sx={customStyle.navmain} position='static' >
        <Toolbar >
          <IconButton edge="start" size="large" aria-label="logo">
            <AdbIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ display: { xs: "none", md: "flex" } }} >
            logo
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexGrow: 1,
              ml: 5,
              color: "#18A0FB",
              // border:'2px solid red',
              textAlign: "center",
              alignItems: "center",
            
            }}
          >
            <Typography>Dashboard</Typography>
            <Typography>Settings</Typography>
          </Stack>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton>
              <Avatar>M</Avatar>
            </IconButton>
            <IconButton size="small" sx={{ color: "#18A0FB;" }}>
              <ArrowDropDownIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

    
    </div>
  );
};

export default Navbar;
