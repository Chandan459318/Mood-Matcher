import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  IconButton,
} from "@mui/material";
import {
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
} from "@mui/icons-material";
import NavigationBar from "../components/NavigationBar";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [emojiFeedback, setEmojiFeedback] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  const feedbackCollection = collection(db, "feedback");

  // Fetch feedback history
  useEffect(() => {
    const fetchFeedbackHistory = async () => {
      try {
        const querySnapshot = await getDocs(feedbackCollection);
        const history = querySnapshot.docs.map((doc) => doc.data());
        setFeedbackHistory(history);
      } catch (err) {
        console.error("Error fetching feedback history:", err);
      }
    };

    fetchFeedbackHistory();
  }, [feedbackCollection]); // Add `feedbackCollection` as a dependency

  const handleEmojiClick = (emoji) => {
    setEmojiFeedback(emoji);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(feedbackCollection, { feedback, emojiFeedback });
      setSubmitted(true);
      setFeedback("");
      setEmojiFeedback(null);
      setError("");

      // Refresh feedback history after submission
      const querySnapshot = await getDocs(feedbackCollection);
      const history = querySnapshot.docs.map((doc) => doc.data());
      setFeedbackHistory(history);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <NavigationBar onLogout={() => console.log("User logged out")} />

      <Box
        sx={{
          maxWidth: 600,
          margin: "50px auto",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Feedback
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Your feedback helps us improve! Please share your thoughts below.
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Emoji Rating */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <IconButton
              color={emojiFeedback === "happy" ? "primary" : "default"}
              onClick={() => handleEmojiClick("happy")}
            >
              <SentimentSatisfied fontSize="large" />
            </IconButton>
            <IconButton
              color={emojiFeedback === "neutral" ? "primary" : "default"}
              onClick={() => handleEmojiClick("neutral")}
            >
              <SentimentNeutral fontSize="large" />
            </IconButton>
            <IconButton
              color={emojiFeedback === "sad" ? "primary" : "default"}
              onClick={() => handleEmojiClick("sad")}
            >
              <SentimentDissatisfied fontSize="large" />
            </IconButton>
          </Box>

          {/* Text Feedback */}
          <TextField
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!feedback}
          >
            Submit Feedback
          </Button>
        </form>
        {submitted && (
          <Alert
            severity="success"
            onClose={() => setSubmitted(false)}
            sx={{ marginTop: "20px" }}
          >
            Thank you for your feedback!
          </Alert>
        )}
        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{ marginTop: "20px" }}
          >
            {error}
          </Alert>
        )}
      </Box>

      {/* Feedback History */}
      <Box
        sx={{
          maxWidth: 600,
          margin: "20px auto",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Feedback History
        </Typography>
        {feedbackHistory.length === 0 ? (
          <Typography align="center">No feedback yet. Be the first!</Typography>
        ) : (
          feedbackHistory.map((entry, index) => (
            <Paper
              key={index}
              sx={{
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#f1f1f1",
              }}
            >
              <Typography variant="body1">{entry.feedback}</Typography>
              <Typography variant="body2" color="textSecondary">
                Emoji Feedback: {entry.emojiFeedback || "None"}
              </Typography>
            </Paper>
          ))
        )}
      </Box>
    </div>
  );
}

export default Feedback;
