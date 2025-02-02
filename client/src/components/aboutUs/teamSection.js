import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for the team member cards
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TeamSection = () => {
  const teamMembers = [
    { name: 'Leul Melakmu', title: 'Founder & CEO', bio: 'John started the company...', image: 'path_to_image' },
    { name: 'Dawit Kindu', title: 'COO', bio: 'Jane leads operations...', image: 'path_to_image' },
    // Add more team members here
  ];

  return (
    <section className="mb-16">
      <motion.h2
        className="text-3xl font-semibold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        Meet the Team
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-12">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-  rounded-lg h-44p-6 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
              delay: index * 0.2, // Staggered animation for each team member
            }}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${member.name}&background=random`}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl text-gray-500 font-semibold">{member.name}</h3>
            <p className="text-gray-500 mb-2">{member.title}</p>
            <p className="text-gray-500">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;

