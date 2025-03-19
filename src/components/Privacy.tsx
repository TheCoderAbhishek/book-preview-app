import React from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaLock, FaInfoCircle, FaFileAlt } from "react-icons/fa";

const Privacy: React.FC = () => {
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
              src="/privacy.jpg"
              alt="Privacy Policy"
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
              Privacy Policy
            </motion.h2>

            <motion.p className="text-gray-700 mb-6" variants={itemVariants}>
              Your privacy is important to us. This Privacy Policy outlines how
              we collect, use, and protect your information when you use our
              Book Preview application.
            </motion.p>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaUserShield className="mr-2 text-blue-500" /> Information We
                Collect
              </h3>
              <p className="text-gray-700 mb-4">
                We may collect certain information to improve your experience
                and provide better services. This may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Usage data (e.g., pages visited, time spent).</li>
                <li>
                  Device information (e.g., browser type, operating system).
                </li>
                <li>Search queries and interactions with the application.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaLock className="mr-2 text-red-500" /> How We Use Your
                Information
              </h3>
              <p className="text-gray-700 mb-4">
                We use the collected information for various purposes,
                including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>To provide and maintain the application.</li>
                <li>To improve and personalize your experience.</li>
                <li>To analyze usage patterns and trends.</li>
                <li>To respond to your inquiries and support requests.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaInfoCircle className="mr-2 text-green-500" /> Data Security
              </h3>
              <p className="text-gray-700 mb-4">
                We take the security of your information seriously and implement
                appropriate measures to protect it.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaFileAlt className="mr-2 text-purple-500" /> Changes to This
                Policy
              </h3>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;
