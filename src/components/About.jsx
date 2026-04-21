import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-primary-0 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden glass-morphism p-2">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
                alt="Developer Working"
                className="rounded-xl w-full h-[500px] object-cover"
              />
            </div>
            {/* Background Decor */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl z-0" />

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 glass-morphism p-6 rounded-2xl border border-white/20 z-20"
            >
              <h4 className="text-3xl font-bold text-gradient">1+</h4>
              <p className="text-gray-400 text-sm">Years experience <br /> in Flutter</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4">About Me</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Crafting seamless <span className="text-gradient">mobile journeys</span> with precision.
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              I specialize in developing high-quality, cross-platform applications using Flutter.
              My approach combines technical excellence with a deep understanding of UI/UX,
              ensuring every pixel serves a purpose and every interaction feels natural.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-white font-bold mb-2 text-xl italic">Performance</h4>
                <p className="text-gray-400 text-sm">Optimized code for smooth 60fps animations.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 text-xl italic">Scalability</h4>
                <p className="text-gray-400 text-sm">Clean architecture and modular codebases.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 text-xl italic">UI/UX Focus</h4>
                <p className="text-gray-400 text-sm">User-centric designs and micro-animations.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 text-xl italic">Firebase</h4>
                <p className="text-gray-400 text-sm">Real-time data and cloud infrastructure.</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-blue-500/20"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
