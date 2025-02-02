import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { Github, Linkedin, Twitter, Mail, ExternalLink, ChevronRight, Download } from 'lucide-react';

const PortfolioHome = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();

  // Sample data - replace with your information
  const personalInfo = {
    name: "Your Name",
    title: "Senior Software Engineer",
    description: "Crafting exceptional digital experiences through innovative solutions and clean, efficient code",
    location: "San Francisco, CA",
    email: "hello@yourname.dev",
    availability: "Open to opportunities",
    experience: "8+ years",
    skills: {
      "Frontend": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
      "Backend": ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
      "Tools & Methods": ["Git", "CI/CD", "Agile", "TDD", "System Design"]
    },
    featuredProjects: [
      {
        title: "Enterprise Dashboard",
        description: "Real-time analytics platform processing 1M+ daily events",
        image: "/api/placeholder/600/400",
        tech: ["React", "TypeScript", "AWS"],
        metrics: ["500k+ Monthly Users", "99.9% Uptime", "50% Faster Loading"],
        link: "#"
      },
      {
        title: "AI-Powered CRM",
        description: "Smart customer relationship management system with ML insights",
        image: "/api/placeholder/600/400",
        tech: ["Python", "TensorFlow", "MongoDB"],
        metrics: ["2x Sales Efficiency", "$2M Revenue Impact", "30k+ Predictions"],
        link: "#"
      }
    ],
    experience: [
      {
        company: "Tech Giant Inc",
        role: "Senior Software Engineer",
        period: "2020 - Present",
        highlights: [
          "Led team of 5 engineers in rebuilding core platform",
          "Reduced loading time by 60% through optimization",
          "Implemented microservices architecture"
        ]
      },
      {
        company: "Startup Co",
        role: "Full Stack Developer",
        period: "2018 - 2020",
        highlights: [
          "Built MVP that secured $2M funding",
          "Scaled user base from 0 to 100k",
          "Introduced automated testing pipeline"
        ]
      }
    ],
    testimonials: [
      {
        name: "Jane Smith",
        role: "Engineering Director",
        company: "Tech Corp",
        text: "One of the most talented engineers I've worked with. Delivers exceptional results consistently."
      },
      {
        name: "John Doe",
        role: "Product Manager",
        company: "Startup Inc",
        text: "Outstanding problem-solver with great communication skills. A true asset to any team."
      }
    ],
    achievements: [
      "Patents: 2 filed, 1 granted",
      "Speaker at ReactConf 2023",
      "Open Source Contributor",
      "Tech Blog: 50k+ monthly readers"
    ]
  };

  // Smooth parallax effect for hero section
  const y = useTransform(scrollY, [0, 500], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Loading animation
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Navbar scroll handling
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Screen */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, display: 'none' }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className="text-4xl font-bold text-white"
        >
          {personalInfo.name.charAt(0)}
        </motion.div>
      </motion.div>

      {/* Navigation Bar */}
      <motion.nav
        style={{ backgroundColor: navbarBg }}
        className="fixed w-full z-40 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.span 
            className="text-xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            {personalInfo.name}
          </motion.span>
          <div className="flex gap-8">
            {['Home', 'Projects', 'Experience', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-1 rounded-full flex items-center gap-2"
            >
              {/* Resume <Download size={16} /> */}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header 
        style={{ y, opacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/5 to-black/20" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center justify-center gap-2">
              <span className="px-4 py-1 rounded-full bg-green-500 text-sm font-medium">
                {personalInfo.availability}
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">{personalInfo.name}</h1>
            <h2 className="text-3xl md:text-4xl mb-6">{personalInfo.title}</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">{personalInfo.description}</p>
            
            <div className="flex justify-center gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium flex items-center gap-2"
              >
                {/* Get in touch <ChevronRight size={16} /> */}
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium"
              >
                View Projects
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.header>

      {/* Skills Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
          >
            Technical Expertise
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(personalInfo.skills).map(([category, skills]) => (
              <motion.div
                key={category}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {personalInfo.featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="text-center">
                          <div className="text-sm text-gray-600">{metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <motion.a
                    href={project.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium"
                  >
                    {/* View Project <ExternalLink size={16} /> */}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
          >
            Professional Journey
          </motion.h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />
            
            {personalInfo.experience.map((exp, index) => (
              <motion.div
                key={exp.company}
                variants={fadeInUp}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 md:w-[calc(100%-2rem)]">
                  <div className="font-bold text-xl mb-2">{exp.role}</div>
                  <div className="text-blue-600 mb-2">{exp.company}</div>
                  <div className="text-gray-600 mb-4">{exp.period}</div>
                  
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {/* <ChevronRight size={16} className="mt-1 text-blue-600 flex-shrink-0" /> */}
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
          >
            What People Say
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {personalInfo.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg p-8 relative"
              >
                <div className="absolute -top-4 left-8 text-6xl text-blue-200">"</div>
                <p className="text-gray-600 mb-6 relative z-10">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
          >
            Achievements & Recognition
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {personalInfo.achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl text-blue-600 mb-4">{index + 1}</div>
                <div className="font-medium">{achievement}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 bg-gray-100"
        id="contact"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16"
          >
            Let's Connect
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Your message..."
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Other Ways to Reach Me</h3>
              
              <div className="space-y-6">
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition">
                  {/* <Mail className="w-6 h-6" /> */}
                  <span>{personalInfo.email}</span>
                </a>
                
                <a href="#" className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition">
                  {/* <Linkedin className="w-6 h-6" /> */}
                  <span>LinkedIn Profile</span>
                </a>
                
                <a href="#" className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition">
                  {/* <Github className="w-6 h-6" /> */}
                  <span>Github Profile</span>
                </a>
                
                <a href="#" className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition">
                  {/* <Twitter className="w-6 h-6" /> */}
                  {/* <span>Twitter Profile</span> */}
                </a>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">Current Location</div>
                <div className="text-gray-600">{personalInfo.location}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">{personalInfo.name}</div>
            <div className="text-gray-400 mb-6">{personalInfo.title}</div>
            <div className="flex justify-center gap-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white transition"
              >
                {/* <Github className="w-6 h-6" /> */}
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white transition"
              >
                {/* <Linkedin className="w-6 h-6" /> */}
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white transition"
              >
                {/* <Twitter className="w-6 h-6" /> */}
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white transition"
              >
                {/* <Mail className="w-6 h-6" /> */}
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PortfolioHome;