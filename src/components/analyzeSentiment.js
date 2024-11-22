const moodMapping = {
    // Example dropdown options with sentiment scores and mood categories
    "Happy": { sentiment: 1, mood: "happy" },
    "Calm": { sentiment: 1, mood: "calm" },
    "Relaxed": { sentiment: 1, mood: "relaxed" },
    "Sad": { sentiment: -1, mood: "sad" },
    "Anxious": { sentiment: -1, mood: "anxious" },
    "Angry": { sentiment: -1, mood: "angry" },
  };
  
  // Analyze sentiment and determine the dominant mood
  export const analyzeSentiment = (responses) => {
    const moodScores = { happy: 0, calm: 0, relaxed: 0, sad: 0, anxious: 0, angry: 0 };
    let totalSentiment = 0;
  
    // Process each response
    responses.forEach((response) => {
      if (moodMapping[response]) {
        const { sentiment, mood } = moodMapping[response];
        totalSentiment += sentiment;
        moodScores[mood] += 1; // Count occurrences of each mood
      }
    });
  
    // Determine dominant mood
    if (totalSentiment > 0) {
      // Positive mood - return the most frequent positive mood
      return Object.keys(moodScores).reduce((a, b) =>
        moodScores[a] > moodScores[b] ? a : b
      );
    } else if (totalSentiment < 0) {
      // Negative mood - return the most frequent negative mood's opposite
      const dominantNegativeMood = Object.keys(moodScores).reduce((a, b) =>
        moodScores[a] > moodScores[b] ? a : b
      );
      // Map negative mood to its opposite
      const oppositeMoods = {
        sad: "happy",
        angry: "calm",
        anxious: "relaxed",
      };
      return oppositeMoods[dominantNegativeMood] || "happy";
    } else {
      // Neutral mood (optional handling)
      return "neutral";
    }
  };
  