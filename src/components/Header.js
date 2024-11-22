// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Mood Matcher
        </Typography>
        <Button color="inherit" component={Link} to="/questionnaire">Questionnaire</Button>
        <Button color="inherit" component={Link} to="/recommendations">Recommendations</Button>
        <Button color="inherit" component={Link} to="/feedback">Feedback</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
