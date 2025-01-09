import React from "react";
import { motion } from "motion/react";
import { smoothScroll } from "../../utils/smoothScroll";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-3xl md:text-3xl font-bold"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-900">
              INFOBOTICS
            </span>
          </motion.div>
          <div className="hidden md:flex space-x-4">
            <a
              href="#about"
              onClick={smoothScroll}
              className="text-gray-800 hover:text-blue-600 transition duration-300"
            >
              About
            </a>
            <a
              href="#features"
              onClick={smoothScroll}
              className="text-gray-800 hover:text-blue-600 transition duration-300"
            >
              Features
            </a>
            <a
              href="#team"
              onClick={smoothScroll}
              className="text-gray-800 hover:text-blue-600 transition duration-300"
            >
              Team
            </a>
            <a
              href="#project"
              onClick={smoothScroll}
              className="text-gray-800 hover:text-blue-600 transition duration-300"
            >
              Project
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
