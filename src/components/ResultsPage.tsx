import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Share2, Sparkles, Heart, CheckCircle, Home } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Summary } from '../types';

interface ResultsPageProps {
  summary: Summary;
  onBackHome: () => void;
}

export const ResultsPage = ({ summary, onBackHome }: ResultsPageProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [copiedText, setCopiedText] = useState(false);
  const [savedId, setSavedId] = useState(summary.id);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!summary.id && summary.user_id) {
      saveSummary();
    }
  }, [summary]);

  const saveSummary = async () => {
    try {
      const { data, error } = await supabase
        .from('summaries')
        .insert({
          user_id: summary.user_id,
          title: summary.title,
          original_content: summary.original_content,
          summary_content: summary.summary_content,
          content_type: summary.content_type,
          original_length: summary.original_length,
          summary_length: summary.summary_length
        })
        .select()
        .maybeSingle();

      if (error) throw error;
      if (data) setSavedId(data.id);
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary.summary_content);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([summary.summary_content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${summary.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: summary.title,
          text: summary.summary_content
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden relative pt-24">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 360,
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                ease: "easeIn",
                delay: Math.random() * 0.5
              }}
            >
              {i % 4 === 0 ? (
                <Heart className="w-4 h-4 text-[#FFB6C1]" fill="currentColor" />
              ) : i % 4 === 1 ? (
                <Sparkles className="w-4 h-4 text-[#F4C2C2]" />
              ) : i % 4 === 2 ? (
                <div className="w-3 h-3 rounded-full bg-[#FFB6C1]" />
              ) : (
                <div className="w-2 h-2 rotate-45 bg-[#F4C2C2]" />
              )}
            </motion.div>
          ))}
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-full opacity-20"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-full flex items-center justify-center shadow-xl"
            >
              <CheckCircle className="w-10 h-10 text-white" strokeWidth={2} />
            </motion.div>

            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] bg-clip-text text-transparent">
              Summary Ready! ✨
            </h1>
            <p className="text-gray-600 text-lg">
              Here's your beautifully crafted summary! 💖
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 shadow-xl border border-pink-100 mb-8"
          >
            <div className="prose prose-lg max-w-none">
              {summary.summary_content.split('\n').map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                  className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FFB6C1] to-[#F4C2C2]"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {copiedText ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy
                  </>
                )}
              </span>
            </motion.button>

            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white border-2 border-[#F4C2C2] text-[#F4C2C2] font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-pink-50 transition-all"
            >
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </span>
            </motion.button>

            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white border-2 border-[#FFB6C1] text-[#FFB6C1] font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-pink-50 transition-all"
            >
              <span className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center"
          >
            <motion.button
              onClick={onBackHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-100 to-white text-gray-700 font-medium rounded-2xl shadow hover:shadow-lg transition-all border border-pink-200"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-50 to-white rounded-full border border-pink-100 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#F4C2C2]" />
              <span className="text-gray-600">
                Summary generated with love and AI magic! 💖
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
