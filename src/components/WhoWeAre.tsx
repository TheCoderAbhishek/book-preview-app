import React from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLaptopCode,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";

const WhoWeAre: React.FC = () => {
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
              src="/who-we-are.jpg"
              alt="Who We Are - AridentRIS Pvt. Ltd."
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
              Who We Are - AridentRIS Pvt. Ltd.
            </motion.h2>

            <motion.p className="text-gray-700 mb-6" variants={itemVariants}>
              AridentRIS Pvt. Ltd. is a dynamic technology company dedicated to
              providing cutting-edge solutions in AI/ML Development, Web App
              Development, Android Development, and more. We are committed to
              innovation and excellence in all our projects.
            </motion.p>

            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaBuilding className="mr-2 text-indigo-500" /> Company Details
              </h3>
              <ul className="list-none text-gray-700">
                <li className="flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2 text-green-500" /> Location:
                  Pune, Maharashtra, India
                </li>
                <li className="flex items-center mb-2">
                  <FaCalendarAlt className="mr-2 text-blue-500" /> Age: 1 Year
                </li>
                <li className="flex items-center">
                  <FaLaptopCode className="mr-2 text-purple-500" /> Owner: Patil
                  Abhishek Hanumant
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Products/Services
              </h3>
              <p className="text-gray-700">
                Our expertise includes AI/ML Development, Web App Development,
                Android Development, and a wide range of custom software
                solutions tailored to meet our clients' needs.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaLightbulb className="mr-2 text-yellow-500" /> Vision
              </h3>
              <p className="text-gray-700 mb-4">
                To be the leading platform for book discovery and exploration,
                empowering readers to find their next favorite book
                effortlessly.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaRocket className="mr-2 text-red-500" /> Mission
              </h3>
              <p className="text-gray-700">
                Our mission is to provide an intuitive and engaging book preview
                experience, leveraging the Google Books API to offer a vast
                library of best-selling books. We aim to foster a love for
                reading by making book discovery accessible and enjoyable for
                everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhoWeAre;
