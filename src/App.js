import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Questionnaire from "./components/Questionnaire";
import Recommendations from "./components/Recommendations";
import Feedback from "./components/Feedback";

function App() {
  const [books, setBooks] = useState([]); // State for mood-based recommendations

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/questionnaire"
          element={<Questionnaire onRecommendations={setBooks} />}
        />
        <Route
          path="/recommendations"
          element={<Recommendations books={books} isMoodBased={books.length > 0} />}
        />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;
