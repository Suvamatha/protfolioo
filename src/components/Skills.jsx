import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Code2, Flame, Globe, Cloud, GitBranch } from 'lucide-react';

const Skills = () => {
  const skills = [
    { name: 'Flutter', icon: <Smartphone />, level: 95, color: '#3b82f6' },
    { name: 'Dart', icon: <Code2 />, level: 90, color: '#60a5fa' },
    { name: 'Firebase', icon: <Flame />, level: 85, color: '#f59e0b' },
    { name: 'REST API', icon: <Globe />, level: 88, color: '#10b981' },
    { name: 'GCP', icon: <Cloud />, level: 75, color: '#3b82f6' },
    { name: 'Git', icon: <GitBranch />, level: 92, color: '#f97316' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-24 bg-primary-1 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            My <span className="text-gradient">Technical Arsenal</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to build performant and scalable mobile applications.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="glass-morphism p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center group"
            >
              <div 
                className="text-5xl mb-6 transition-transform group-hover:scale-110 duration-300"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{skill.name}</h3>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
              <span className="text-gray-400 text-xs mt-2 uppercase tracking-widest">{skill.level}% Mastery</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
