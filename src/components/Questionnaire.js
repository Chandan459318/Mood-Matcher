import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Box,
} from "@mui/material";
import { analyzeSentiment } from "../components/analyzeSentiment";
import { fetchBooks } from "../components/fetchBooks";
import NavigationBar from "../components/NavigationBar";

function Questionnaire({ onRecommendations }) {
  const [responses, setResponses] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Convert responses to an array of selected options
      const responseArray = Object.values(responses);
      // Analyze sentiment and get dominant mood
      const dominantMood = analyzeSentiment(responseArray);

      console.log("Dominant Mood:", dominantMood);

      // Fetch recommendations based on the mood
      const recommendations = await fetchBooks(dominantMood);
      onRecommendations(recommendations);

      // Navigate to Recommendations page
      navigate("/recommendations", { state: { isMoodBased: true } });
    } catch (err) {
      console.error("Error during sentiment analysis or fetching recommendations:", err);
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <NavigationBar onLogout={() => navigate("/login")} />

      <Box
        sx={{
          maxWidth: 600,
          margin: "50px auto",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Mood Questionnaire
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Question 1 */}
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <Typography sx={{ marginBottom: "8px" }}>How are you feeling today?</Typography>
            <Select
              name="question1"
              value={responses.question1}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                Select your mood
              </MenuItem>
              <MenuItem value="Happy">Happy</MenuItem>
              <MenuItem value="Calm">Calm</MenuItem>
              <MenuItem value="Sad">Sad</MenuItem>
              <MenuItem value="Angry">Angry</MenuItem>
              <MenuItem value="Anxious">Anxious</MenuItem>
            </Select>
          </FormControl>

          {/* Question 2 */}
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <Typography sx={{ marginBottom: "8px" }}>How is your day going?</Typography>
            <Select
              name="question2"
              value={responses.question2}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              <MenuItem value="Great">Great</MenuItem>
              <MenuItem value="Relaxed">Relaxed</MenuItem>
              <MenuItem value="Stressful">Stressful</MenuItem>
              <MenuItem value="Terrible">Terrible</MenuItem>
            </Select>
          </FormControl>

          {/* Question 3 */}
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <Typography sx={{ marginBottom: "8px" }}>How are you feeling about work or studies?</Typography>
            <Select
              name="question3"
              value={responses.question3}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              <MenuItem value="Motivated">Motivated</MenuItem>
              <MenuItem value="Content">Content</MenuItem>
              <MenuItem value="Stressed">Stressed</MenuItem>
              <MenuItem value="Overwhelmed">Overwhelmed</MenuItem>
            </Select>
          </FormControl>

          {/* Question 4 */}
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <Typography sx={{ marginBottom: "8px" }}>How do you feel about your relationships?</Typography>
            <Select
              name="question4"
              value={responses.question4}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              <MenuItem value="Supportive">Supportive</MenuItem>
              <MenuItem value="Peaceful">Peaceful</MenuItem>
              <MenuItem value="Difficult">Difficult</MenuItem>
              <MenuItem value="Frustrating">Frustrating</MenuItem>
            </Select>
          </FormControl>

          {/* Question 5 */}
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <Typography sx={{ marginBottom: "8px" }}>How do you feel physically?</Typography>
            <Select
              name="question5"
              value={responses.question5}
              onChange={handleChange}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              <MenuItem value="Energetic">Energetic</MenuItem>
              <MenuItem value="Relaxed">Relaxed</MenuItem>
              <MenuItem value="Tired">Tired</MenuItem>
              <MenuItem value="Unwell">Unwell</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
            sx={{ marginTop: "10px" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
          {error && (
            <Typography color="error" sx={{ marginTop: "10px" }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </div>
  );
}

export default Questionnaire;
