// src/pages/Register.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import AuthLayout from "../components/AuthLayout";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // Register the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Save additional user details to Firestore
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        role: "user", // Default role; you can modify as needed
      });

      // Redirect to the login page
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Register">
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          type="text"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: "20px", background: "#1976d2" }}
        >
          Register
        </Button>
        <Typography variant="body2" sx={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Button variant="text" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Typography>
      </Box>
    </AuthLayout>
  );
}

export default Register;
