import React from "react";
import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa";

const ProjectLinks = () => {
  return (
    <section id="project" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Project Resources
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/80SuSCE3SKU?si=3Hpu9CtMvIfKmfp7"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
                title="Video"
              ></iframe>
            </div>
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a
              href="https://github.com/rahul2261999/chatbot-fe/tree/langflow-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              <FaGithub className="text-xl" />
              <span>Explore the Frontend Repository</span>
            </a>
            <a
              href="https://github.com/rahul2261999/chatbot-be/tree/lanflow-api-integration"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
            >
              <FaGithub className="text-xl" />
              <span>Explore the Backend Repository</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectLinks;
