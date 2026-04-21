import { ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-primary-0 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-white">Flutter</span>
              <span className="text-gradient">Dev</span>
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Creating high-performance mobile experiences with the latest technologies and a focus on premium UI/UX.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <FaGithub size={22} />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <FaLinkedin size={22} />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <FaTwitter size={22} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500/10 transition-all">
              <ArrowUp size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest pl-1">Top</span>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 FlutterDev Portfolio. All rights reserved.
          </p>
          <div className="flex gap-8 text-gray-600 text-xs font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
