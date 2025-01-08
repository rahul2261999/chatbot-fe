import React from 'react';
import { motion } from 'motion/react';
import { FaRobot, FaChartLine, FaClipboardList, FaPlug } from 'react-icons/fa';

const features = [
  { icon: FaRobot, title: 'AI-Powered Insights', description: 'Leverage advanced AI for deep social media analysis.' },
  { icon: FaChartLine, title: 'Real-Time Data Analysis', description: 'Get up-to-the-minute insights on your social media performance.' },
  { icon: FaClipboardList, title: 'Customizable Reports', description: 'Tailor your reports to focus on the metrics that matter to you.' },
  { icon: FaPlug, title: 'Seamless Integration', description: 'Easily integrate with your existing social media tools and workflows.' },
];

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="text-4xl text-blue-600 mb-4 mx-auto" />
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

