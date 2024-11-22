// src/components/AuthLayout.js
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function AuthLayout({ title, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #1976d2, #42a5f5)",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "400px",
          padding: "30px",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
}

export default AuthLayout;
