import React, { useEffect, useState } from "react";
import { fetchBooks } from "../components/fetchBooks";
import { Card, CardContent, CardMedia, Typography, Button, Link } from "@mui/material";
import NavigationBar from "../components/NavigationBar";

function Recommendations({ books, isMoodBased }) {
  const [defaultBooks, setDefaultBooks] = useState([]); // State for default books
  const [visibleBooks, setVisibleBooks] = useState(10); // Number of books to display initially
  const [error, setError] = useState(""); // Error state for better feedback

  useEffect(() => {
    const fetchDefaultBooks = async () => {
      try {
        console.log("Fetching default books...");
        const defaultRecommendations = await fetchBooks("fiction"); // Default books (fiction genre)
        console.log("Default books fetched:", defaultRecommendations.length);
        setDefaultBooks(defaultRecommendations || []);
      } catch (error) {
        console.error("Error fetching default books:", error);
        setError("Failed to fetch default recommendations. Please try again later.");
      }
    };

    fetchDefaultBooks();
  }, []);

  // Books to display: either mood-based or default books
  const booksToDisplay = isMoodBased && books?.length > 0 ? books : defaultBooks;

  return (
    <div>
      {/* Navigation Bar */}
      <NavigationBar onLogout={() => console.log("User logged out")} />

      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Book Recommendations
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : booksToDisplay.length === 0 ? (
          <Typography>No recommendations available. Please try again.</Typography>
        ) : (
          <>
            {booksToDisplay.slice(0, visibleBooks).map((book, index) => (
              <Card key={index} style={{ margin: "20px auto", maxWidth: "600px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={book.volumeInfo.imageLinks?.thumbnail || ""}
                  alt={book.volumeInfo.title}
                />
                <CardContent>
                  <Typography variant="h5">{book.volumeInfo.title}</Typography>
                  <Typography variant="subtitle1">
                    {book.volumeInfo.authors?.join(", ")}
                  </Typography>
                  <Typography variant="body2" style={{ margin: "10px 0" }}>
                    {book.volumeInfo.description || "No description available."}
                  </Typography>
                  {/* Add link to the book */}
                  <Link
                    href={book.volumeInfo.infoLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: "10px", display: "block", color: "#1976d2" }}
                  >
                    Read More
                  </Link>
                </CardContent>
              </Card>
            ))}
            {visibleBooks < booksToDisplay.length && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setVisibleBooks(visibleBooks + 10)} // Load 10 more books on click
                style={{ marginTop: "20px" }}
              >
                Load More
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Recommendations;
