import { motion } from 'framer-motion';
import { Sparkles, FileText, Heart, Upload, LayoutDashboard } from 'lucide-react';

interface HomePageProps {
  onCreateNew: () => void;
  onViewDashboard: () => void;
}

export const HomePage = ({ onCreateNew, onViewDashboard }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative pt-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] blur-2xl opacity-30 rounded-full" />
              <FileText className="w-24 h-24 text-[#F4C2C2] relative z-10" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#F4C2C2] via-[#FFB6C1] to-[#F4C2C2] bg-clip-text text-transparent"
          >
            Welcome Back! ✨
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to create more beautiful summaries? Choose an action below to get started! 🌸
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <motion.button
              onClick={onCreateNew}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px -10px rgba(244, 194, 194, 0.5)'
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-6 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FFB6C1] to-[#F4C2C2]"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex flex-col items-center gap-3">
                <Upload className="w-8 h-8" strokeWidth={2} />
                <span className="text-lg font-semibold">Create New Summary</span>
              </span>
            </motion.button>

            <motion.button
              onClick={onViewDashboard}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px -10px rgba(255, 182, 193, 0.5)'
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-6 bg-white border-3 border-pink-200 text-gray-700 rounded-3xl shadow-xl hover:shadow-2xl hover:bg-pink-50 transition-all duration-300"
            >
              <span className="relative z-10 flex flex-col items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-[#F4C2C2]" strokeWidth={2} />
                <span className="text-lg font-semibold">View Dashboard</span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-24 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Smart Analysis',
              desc: 'Our AI understands context and extracts the most important information',
              emoji: '🧠',
              color: 'from-[#F4C2C2] to-[#FFB6C1]'
            },
            {
              title: 'Quick & Easy',
              desc: 'Get your summary in seconds with just a few clicks',
              emoji: '⚡',
              color: 'from-[#FFB6C1] to-[#F4C2C2]'
            },
            {
              title: 'Always Accessible',
              desc: 'Access your summaries anytime from your dashboard',
              emoji: '🎯',
              color: 'from-[#F4C2C2] to-[#FFB6C1]'
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-3xl shadow-lg border border-pink-100 group"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                className="text-5xl mb-4"
              >
                {feature.emoji}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-50 to-white rounded-full border border-pink-100 shadow-sm">
            <Heart className="w-5 h-5 text-[#F4C2C2]" fill="currentColor" />
            <span className="text-gray-600">
              Made with love and AI magic! 💖
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
