import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaCode, FaBook, FaMobileAlt } from "react-icons/fa";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 min-h-screen py-8"
    >
      <div className="container mx-auto max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image/Illustration Side */}
          <div className="md:w-1/2">
            <motion.img
              src="/about-image.jpg" // Replace with your image
              alt="About Book Preview"
              className="w-full h-full object-cover"
              variants={itemVariants}
            />
          </div>

          {/* Text Content Side */}
          <div className="md:w-1/2 p-8">
            <motion.h2
              className="text-3xl font-semibold mb-6 text-gray-800"
              variants={itemVariants}
            >
              About Book Preview
            </motion.h2>

            <motion.p className="text-gray-700 mb-6" variants={itemVariants}>
              Book Preview is a web application designed to help you discover
              and explore books from the Google Books API. We aim to provide a
              user-friendly interface for browsing best-selling books and
              previewing them.
            </motion.p>

            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaBook className="mr-2 text-green-500" /> Key Features
              </h3>
              <ul className="list-none text-gray-700">
                <li className="flex items-center mb-2">
                  <FaCode className="mr-2 text-blue-500" /> Browse best-selling
                  books.
                </li>
                <li className="flex items-center mb-2">
                  <FaMobileAlt className="mr-2 text-purple-500" /> Preview book
                  details.
                </li>
                <li className="flex items-center">
                  <FaReact className="mr-2 text-red-500" /> Responsive design
                  for all devices.
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Technology Stack
              </h3>
              <p className="text-gray-700">
                This application is built using: React with TypeScript, Vite,
                Tailwind CSS, Google Books API, and Framer Motion.
              </p>
              <p className="text-gray-700">
                If you have any questions or feedback, please feel free to
                contact us through our{" "}
                <a href="/contact" className="text-blue-600 hover:underline">
                  contact page
                </a>
                .
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
