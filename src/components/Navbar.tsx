import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";
import React, { useState } from "react";
import debounce from "lodash/debounce";
import axios from "axios";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Books Category", href: "/categories", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
];

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

const debouncedSearch = debounce(
  async (
    searchTerm: string,
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
    setSearchResults: React.Dispatch<React.SetStateAction<Book[]>>,
    setSearchError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      if (searchTerm) {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/volumes?q=${searchTerm}&maxResults=3`
        );
        setSearchResults(response.data.items || []);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setSearchResults([]);
      setSearchError(
        axios.isAxiosError(err)
          ? err.message
          : "An unexpected search error occurred."
      );
    } finally {
      setIsSearching(false);
    }
  },
  300
);

export default function Navbar() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearchToggle = () => {
    setSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setSearchTerm("");
      setSearchResults([]);
      setSearchError(null);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debouncedSearch(
      event.target.value,
      setIsSearching,
      setSearchResults,
      setSearchError
    );
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <FaBars
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <FaTimes
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Book Preview Logo"
                src="/logo.png"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={handleSearchToggle}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <FaSearch className="h-6 w-6" />
            </button>
            {isSearchVisible && (
              <div
                className={`absolute top-full mt-2 right-0 bg-white rounded-md shadow-lg p-2 z-10 ${
                  window.innerWidth < 640 ? "w-screen" : "w-64 md:w-80 lg:w-96"
                }`}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    aria-label="Search books"
                    className="w-full p-2 border rounded-md text-gray-800"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSearchResults([]);
                        setSearchError(null);
                      }}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    >
                      <FaTimesCircle />
                    </button>
                  )}
                  {isSearching && (
                    <FaSpinner className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-600" />
                  )}
                </div>
                {searchError && (
                  <div className="text-red-500 mt-2">{searchError}</div>
                )}
                {searchResults.length > 0 && (
                  <ul className="mt-2">
                    {searchResults.map((book) => (
                      <li
                        key={book.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      >
                        {book.volumeInfo.imageLinks &&
                          book.volumeInfo.imageLinks.thumbnail && (
                            <img
                              src={book.volumeInfo.imageLinks.thumbnail}
                              alt={book.volumeInfo.title}
                              className="h-12 w-8 object-cover mr-2"
                            />
                          )}
                        <div>
                          <p className="font-semibold">
                            {book.volumeInfo.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {book.volumeInfo.authors?.join(", ") ||
                              "Unknown Author"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
