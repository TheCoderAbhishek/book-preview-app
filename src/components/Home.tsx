import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

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
          `${
            import.meta.env.VITE_API_BASE_URL
          }/volumes?q=best-selling&maxResults=15`
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
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
          Few Best-Selling Books
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <img
                src={book.volumeInfo?.imageLinks?.thumbnail}
                alt={book.volumeInfo?.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">
                    {book.volumeInfo?.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
                  </p>
                </div>
                <a
                  href={book.volumeInfo?.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded block text-center hover:from-green-500 hover:to-green-700 transition-colors duration-300"
                >
                  Preview
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
