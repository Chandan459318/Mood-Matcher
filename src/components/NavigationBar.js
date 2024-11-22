import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

function NavigationBar({ onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout(); // Call the logout function passed as a prop
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title on the Left */}
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Mood Matcher
        </Typography>

        {/* Center Navigation Links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Typography
            sx={{
              cursor: "pointer",
              margin: "0 15px",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/questionnaire")}
          >
            Questionnaire
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              margin: "0 15px",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/recommendations")}
          >
            Recommendations
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
              margin: "0 15px",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/feedback")}
          >
            Feedback
          </Typography>
        </Box>

        {/* Profile Image on the Right */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="profile"
          onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
