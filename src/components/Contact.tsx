import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);

    try {
      await axios.post("https://getform.io/f/bjjmrnpb", {
        name,
        email,
        message,
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const messageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 py-8"
    >
      <div className="container mx-auto max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Contact Us
        </h2>
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">
                {" "}
                Your message has been sent.
              </span>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={handleSubmit}>
          <motion.div
            className="mb-4"
            initial="hidden"
            animate="visible"
            variants={inputVariants}
          >
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-shadow duration-300"
              required
            />
          </motion.div>
          <motion.div
            className="mb-4"
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            transition={{ delay: 0.1 }}
          >
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-shadow duration-300"
              required
            />
          </motion.div>
          <motion.div
            className="mb-6"
            initial="hidden"
            animate="visible"
            variants={inputVariants}
            transition={{ delay: 0.2 }}
          >
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-shadow duration-300"
              rows={4}
              required
            ></textarea>
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300"
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
