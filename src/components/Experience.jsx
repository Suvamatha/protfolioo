import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      year: '2023 - Present',
      role: 'Senior Flutter Developer',
      company: 'AppScale Solutions',
      desc: 'Leading the development of high-performance mobile apps for global clients. Optimized app performance by 40% using advanced caching strategies.',
    },
    {
      year: '2021 - 2023',
      role: 'Flutter Developer',
      company: 'TechFlow Systems',
      desc: 'Developed and maintained cross-platform apps using Flutter and Firebase. Integrated complex payment gateways and real-time features.',
    },
    {
      year: '2020 - 2021',
      role: 'Junior Mobile Developer',
      company: 'Creative Apps Studio',
      desc: 'Started my journey with mobile development, focusing on UI/UX implementation and REST API integration.',
    },
  ];

  return (
    <section id="experience" className="py-24 bg-primary-1">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-gray-400">My evolution as a developer in the mobile ecosystem.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10" />

              <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-12">
                <div className="glass-morphism p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-colors">
                  <span className="text-blue-400 font-bold mb-2 block">{exp.year}</span>
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-gray-400 font-medium mb-4 italic">{exp.company}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
