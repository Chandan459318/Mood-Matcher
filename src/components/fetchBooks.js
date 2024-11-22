export const fetchBooks = async (query) => {
    const apiKey = "AIzaSyAfOseFYuW3TlpLxz4kUp6aGnTX7HHRR3M"; // Replace with your actual API key
    const maxResults = 40; // Set to the maximum allowed limit
  
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${apiKey}`
      );
      const data = await response.json();
      console.log("Books fetched:", data.items?.length || 0);
      return data.items || [];
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  };
  
  