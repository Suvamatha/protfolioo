import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Smartphone, ChevronDown } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

// Import local assets
import medicineImg from '../assets/medicine.png';
import financeImg from '../assets/finance.png';
import calculatorImg from '../assets/calculator.png';

const Projects = () => {
  const projects = [
    {
      title: 'Medicine Reminder App',
      description: 'A comprehensive healthcare companion with smart notifications, medication history, and dosage tracking.',
      tech: ['Flutter', 'Firebase', 'Local Notifications', 'Hive'],
      image: medicineImg,
      github: '#',
      demo: '#',
    },
    {
      title: 'Finance Dashboard',
      description: 'Elegant UI/UX experimental app for personal finance management with beautiful charts and dark mode.',
      tech: ['Flutter', 'Custom Painter', 'Riverpod', 'SQLite'],
      image: financeImg,
      github: '#',
      demo: '#',
    },
    {
      title: 'Modern Calculator',
      description: 'A sleek, minimalist calculator featuring advanced mathematical functions and a premium glassmorphic UI.',
      tech: ['Flutter', 'Provider', 'Unit Testing'],
      image: calculatorImg,
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-24 bg-primary-0">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-xl">
            <h3 className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4">Portfolio</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-gray-400">
              A selection of my recent work in mobile engineering and design.
            </p>
          </div>
          <button className="text-white font-bold flex items-center gap-2 hover:text-blue-400 transition-colors">
            View All Projects <ExternalLink size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-morphism rounded-3xl overflow-hidden border border-white/10 flex flex-col h-full"
            >
              <div className="relative group overflow-hidden h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-4">
                    <a href={project.github} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                      <FaGithub size={20} />
                    </a>
                    <a href={project.demo} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                      <Smartphone size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-white font-bold text-sm flex items-center gap-2 group italic"
                  >
                    CASE STUDY <ChevronDown size={14} className="rotate-[-90deg] group-hover:text-blue-500 transition-colors" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
