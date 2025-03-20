import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { motion } from "framer-motion";
import "./design/Home.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 15;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const startIndex = (currentPage - 1) * booksPerPage;
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/volumes?q=best-selling&maxResults=${booksPerPage}&startIndex=${startIndex}`
        );

        setBooks(response.data.items || []);
        setTotalPages(Math.ceil(response.data.totalItems / booksPerPage));
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

    fetchBooks();
  }, [currentPage]);

  const handlePreviewClick = (bookId: string) => {
    navigate(`/book-details?id=${bookId}`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (endPage - startPage < 2) {
      if (currentPage === 1) {
        endPage = Math.min(totalPages, 3);
      } else {
        startPage = Math.max(1, totalPages - 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    return <div className="flex justify-center mt-8">{pages}</div>;
  };

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
              <motion.img
                src={book.volumeInfo?.imageLinks?.thumbnail}
                alt={book.volumeInfo?.title}
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-gray-800 title-typewriter">
                    {book.volumeInfo?.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
                  </p>
                </div>
                <motion.button
                  onClick={() => handlePreviewClick(book.id)}
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded block text-center"
                  whileHover={{
                    background: "linear-gradient(to right, #55c57a, #28b485)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Preview
                </motion.button>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && renderPagination()}
      </div>
    </div>
  );
};

export default Home;
