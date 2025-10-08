import { motion } from 'framer-motion';
import { Sparkles, FileText, Heart } from 'lucide-react';

interface IntroductionPageProps {
  onGetStarted: () => void;
}

export const IntroductionPage = ({ onGetStarted }: IntroductionPageProps) => {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
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
            Notes Summarizer ✨
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transform your lengthy notes into beautiful, concise summaries with a sprinkle of magic!
            Upload your PDFs or paste your text, and watch the magic happen! 🌸
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center gap-8 mb-16"
          >
            {[
              { icon: Sparkles, text: 'AI-Powered', color: 'from-[#F4C2C2]' },
              { icon: Heart, text: 'Super Cute', color: 'from-[#FFB6C1]' },
              { icon: FileText, text: 'Easy to Use', color: 'from-[#F4C2C2]' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.05 }}
                className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-gradient-to-br from-white to-pink-50 shadow-lg border border-pink-100"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] flex items-center justify-center shadow-md">
                  <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <span className="text-gray-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            onClick={onGetStarted}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px -10px rgba(244, 194, 194, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-5 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FFB6C1] to-[#F4C2C2]"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              Get Started
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Upload Your Notes',
              desc: 'Drag & drop your PDF or paste your text directly',
              emoji: '📝'
            },
            {
              title: 'AI Magic Happens',
              desc: 'Our cute AI reads and understands your content',
              emoji: '✨'
            },
            {
              title: 'Get Your Summary',
              desc: 'Receive a beautiful, concise summary instantly',
              emoji: '🎀'
            }
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-3xl shadow-lg border border-pink-100"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                className="text-5xl mb-4"
              >
                {step.emoji}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
