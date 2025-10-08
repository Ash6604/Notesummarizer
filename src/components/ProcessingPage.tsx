import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, FileText, Brain } from 'lucide-react';

interface ProcessingPageProps {
  onComplete: () => void;
}

const messages = [
  'Reading your notes... 📖',
  'Understanding the content... 🤔',
  'Finding key points... ✨',
  'Creating your summary... 💖',
  'Almost there... 🌸'
];

export const ProcessingPage = ({ onComplete }: ProcessingPageProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0.3
            }}
            animate={{
              y: -100,
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {i % 3 === 0 ? (
              <Sparkles className="w-4 h-4 text-[#FFB6C1]" />
            ) : i % 3 === 1 ? (
              <Heart className="w-4 h-4 text-[#F4C2C2]" fill="currentColor" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1]" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
          className="mb-12"
        >
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative w-32 h-32 mx-auto"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-full blur-2xl"
            />

            <div className="relative w-32 h-32 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-full flex items-center justify-center shadow-2xl">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Brain className="w-16 h-16 text-white" strokeWidth={1.5} />
              </motion.div>
            </div>

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-br from-[#FFB6C1] to-[#F4C2C2] rounded-full"
                style={{
                  originX: 0.5,
                  originY: 0.5
                }}
                animate={{
                  x: Math.cos(i * 45 * Math.PI / 180) * 80,
                  y: Math.sin(i * 45 * Math.PI / 180) * 80,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] bg-clip-text text-transparent"
        >
          Working Our Magic! ✨
        </motion.h2>

        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl text-gray-600 mb-12 h-8"
        >
          {messages[messageIndex]}
        </motion.div>

        <div className="max-w-md mx-auto mb-8">
          <div className="bg-pink-50 rounded-full h-6 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] rounded-full relative"
            >
              <motion.div
                animate={{
                  x: [0, 20, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
          <p className="text-right text-gray-500 mt-2 text-sm font-medium">{progress}%</p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { icon: FileText, label: 'Analyzing', delay: 0 },
            { icon: Brain, label: 'Processing', delay: 0.2 },
            { icon: Sparkles, label: 'Summarizing', delay: 0.4 }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + item.delay }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.3
                }}
                className="w-14 h-14 bg-gradient-to-br from-pink-100 to-white rounded-2xl flex items-center justify-center shadow-lg border border-pink-100"
              >
                <item.icon className="w-7 h-7 text-[#F4C2C2]" strokeWidth={1.5} />
              </motion.div>
              <span className="text-sm text-gray-600 font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <div className="flex items-center justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-3 h-3 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
