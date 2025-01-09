import React from "react";
import { motion } from "motion/react";

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
            <h2 className="text-3xl font-bold mb-4 text-blue-600">
              About INFOBOTICS
            </h2>
            <p className="text-gray-700 mb-6">
              Welcome to INFOBOTICS, the AI-powered chatbot revolutionizing
              social media performance analysis. INFOBOTICS is more than just a
              platform—it’s your intelligent assistant for understanding and
              optimizing your social media presence. Designed for businesses,
              influencers, and marketers, INFOBOTICS brings the power of AI to
              your fingertips. With a user-friendly interface and real-time
              communication, our chatbot empowers you to make data-driven
              decisions and stay ahead in the competitive social media
              landscape. Experience the future of social media analysis with
              INFOBOTICS—your AI chatbot for smarter insights and better
              results!
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
