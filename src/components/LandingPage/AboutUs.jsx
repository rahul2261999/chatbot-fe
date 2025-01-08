import React from 'react';
import { motion } from 'motion/react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src="/placeholder.svg?height=400&width=400" alt="AI Illustration" className="w-full max-w-md mx-auto" />
          </motion.div> */}
          <motion.div
            className="md:w-1/2 md:pl-10"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-600">About InsightSphere</h2>
            <p className="text-gray-700 mb-6">
              InsightSphere is an AI-powered chatbot leveraging Retrieval-Augmented Generation (RAG) to provide real-time social media performance analysis. Designed for businesses and creators, it simplifies decision-making with actionable insights.
            </p>
            <motion.button
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

