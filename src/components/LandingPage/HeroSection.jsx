import React from 'react';
import { motion } from 'motion/react';
import HeroBgImage from '../../assets/image/hero_bg.webp'

const HeroSection = () => {
  return (
    <motion.div
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        // initial={{ scale: 1 }}
        // animate={{ scale: 1.05 }}
        // transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      >
        {/* <img
          src={HeroBgImage}
          alt="Technology Background"
          className="w-full h-full object-cover"
        /> */}
      </motion.div>
      <div className="relative z-10 text-center text-white">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Harness the power of AI
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl from-purple"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          to unlock social media insights like never before.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default HeroSection;

