import React from "react";
import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        position: "fixed",
        height: "50px",
        borderTop: "1px solid #BABABA",
        background: "#FFFFFF",

        left: 0,
        bottom: 0,
      }}
    >
      <span
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          gap: "30px",
          marginLeft: "20px",
        }}
      >
        <Typography
          color="primary"
          sx={{
            color: "#18A0FB",
            fontSize: "14px",
          }}
        >
          Privacy Policy
        </Typography>
        <Typography
          color="primary"
          sx={{
            color: "#18A0FB",
            fontSize: "14px",
          }}
        >
          Terms of service
        </Typography>
        <Typography
          sx={{
            color: "#BABABA",
            fontSize: "14px",
          }}
        >
          © 2022 Darse Technologies All rights reserved{" "}
        </Typography>
      </span>
    </Box>
  );
};
