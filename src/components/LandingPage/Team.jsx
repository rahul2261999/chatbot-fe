import React from "react";
import { motion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Anirban Pal",
    role: "",
    image: "https://ca.slack-edge.com/TC3TKQU8P-U031ZCQ94CU-96228cf09192-512",
    git: "https://github.com/approjecthub",
    linkedIn: "https://www.linkedin.com/in/anirban-pal-6a1243130/",
  },
  {
    name: "Akshay K S",
    role: "",
    image: "https://ca.slack-edge.com/TC3TKQU8P-U041DKG7T4Z-59d0d70f0171-512",
    git: "https://github.com/akshayks3",
    linkedIn: "https://www.linkedin.com/in/akshayks3/",
  },
  {
    name: "Rahul Saini",
    role: "",
    image: "https://ca.slack-edge.com/TC3TKQU8P-U05E5GC1JGJ-bd6f91d3e2f6-512",
    git: "https://github.com/rahul2261999",
    linkedIn: "https://www.linkedin.com/in/rahul-saini22/",
  },
  {
    name: "Naman Sinha",
    role: "",
    image: "https://ca.slack-edge.com/TC3TKQU8P-U03KXNJR36V-8bb379f48174-512",
    git: "https://github.com/Greyroot328",
    linkedIn: "https://www.linkedin.com/in/namansinha-in/",
  },
];

const TeamMember = ({ name, role, image, git, linkedIn }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg text-center"
    whileHover={{ scale: 1.05, rotate: 2 }}
    whileTap={{ scale: 0.95 }}
  >
    <img
      src={image}
      alt={name}
      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
    />
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-gray-600 mb-4">{role}</p>
    <div className="flex justify-center space-x-4">
      <a
        href={git}
        className="text-gray-600 hover:text-blue-600 transition duration-300"
        target="_blank"
      >
        <FaGithub className="text-2xl" />
      </a>
      <a
        href={linkedIn}
        className="text-gray-600 hover:text-blue-600 transition duration-300"
        target="_blank"
      >
        <FaLinkedin className="text-2xl" />
      </a>
    </div>
  </motion.div>
);

const Team = () => {
  return (
    <section id="team" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TeamMember {...member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
