import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: { type: string; identifier: string }[];
    readingModes: { text: boolean; image: boolean };
    pageCount?: number;
    printedPageCount?: number;
    printType: string;
    categories?: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary?: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  layerInfo?: {
    layers: { layerId: string; volumeAnnotationsVersion: string }[];
  };
  saleInfo: { country: string; saleability: string; isEbook: boolean };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: { isAvailable: boolean; acsTokenLink: string };
    pdf: { isAvailable: boolean };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
}

const BookDetails: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookId = searchParams.get("id");
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        if (bookId) {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/volumes/${bookId}`
          );
          setBook(response.data);
        }
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

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex justify-center items-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
        <div
          className="w-1/3 bg-cover bg-center"
          style={{
            backgroundImage: `url(${book.volumeInfo.imageLinks?.thumbnail})`,
          }}
        ></div>
        <div className="w-2/3 p-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            {book.volumeInfo.title}
          </h2>
          {book.volumeInfo.subtitle && (
            <h3 className="text-xl italic text-gray-600 mb-3">
              {book.volumeInfo.subtitle}
            </h3>
          )}
          <p className="text-lg italic text-gray-700 mb-6">
            {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
          </p>
          <div
            className="text-gray-800 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{
              __html:
                book.volumeInfo.description || "No description available.",
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Pages:{" "}
                <span className="text-gray-800">
                  {book.volumeInfo.pageCount || "Unknown"}
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Publisher:{" "}
                <span className="text-gray-800">
                  {book.volumeInfo.publisher || "Unknown"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Published Date:{" "}
                <span className="text-gray-800">
                  {book.volumeInfo.publishedDate || "Unknown"}
                </span>
              </p>
              {book.volumeInfo.categories && (
                <p className="text-sm font-semibold text-gray-600">
                  Categories:{" "}
                  <span className="text-gray-800">
                    {book.volumeInfo.categories.join(", ")}
                  </span>
                </p>
              )}
            </div>
          </div>
          <a
            href={book.volumeInfo.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            Preview Book
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
