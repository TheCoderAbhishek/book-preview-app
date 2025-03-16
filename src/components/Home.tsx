// src/components/Home.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader"; // Import the Loader component

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    previewLink: string;
  };
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/volumes?q=random&maxResults=10`
        );
        setBooks(response.data.items || []);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRandomBooks();
  }, []);

  if (loading) {
    return <Loader />; // Use the Loader component
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Random Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border rounded p-4">
            <img
              src={book.volumeInfo?.imageLinks?.thumbnail}
              alt={book.volumeInfo?.title}
              className="mb-2 w-full object-contain h-64"
            />
            <h2 className="text-lg font-semibold mb-1">
              {book.volumeInfo?.title}
            </h2>
            <p className="text-sm">
              {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
            </p>
            <a
              href={book.volumeInfo?.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-2 rounded mt-2 block text-center"
            >
              Preview
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
