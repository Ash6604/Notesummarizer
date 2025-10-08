import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Trash2, Eye, Sparkles, Plus, Calendar, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Summary } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface DashboardPageProps {
  onViewSummary: (summary: Summary) => void;
  onCreateNew: () => void;
}

export const DashboardPage = ({ onViewSummary, onCreateNew }: DashboardPageProps) => {
  const { user } = useAuth();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSummaries(data || []);
    } catch (error) {
      console.error('Error fetching summaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('summaries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSummaries(summaries.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting summary:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalSummaries = summaries.length;
  const totalCharactersSaved = summaries.reduce(
    (acc, s) => acc + (s.original_length - s.summary_length),
    0
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Sparkles className="w-4 h-4 text-[#FFB6C1] opacity-10" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Your Dashboard 📊</h1>
          <p className="text-gray-600 text-lg">Track all your beautiful summaries in one place!</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: FileText,
              label: 'Total Summaries',
              value: totalSummaries,
              color: 'from-[#F4C2C2] to-[#FFB6C1]'
            },
            {
              icon: TrendingUp,
              label: 'Characters Saved',
              value: totalCharactersSaved.toLocaleString(),
              color: 'from-[#FFB6C1] to-[#F4C2C2]'
            },
            {
              icon: Calendar,
              label: 'This Month',
              value: summaries.filter(s => {
                const date = new Date(s.created_at);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length,
              color: 'from-[#F4C2C2] to-[#FFB6C1]'
            }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-3xl shadow-lg border border-pink-100"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                <stat.icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Recent Summaries ✨</h2>
          <motion.button
            onClick={onCreateNew}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            New Summary
          </motion.button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#FFB6C1] border-t-transparent rounded-full"
            />
          </div>
        ) : summaries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              📝
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No summaries yet!</h3>
            <p className="text-gray-600 mb-8">Create your first summary to get started</p>
            <motion.button
              onClick={onCreateNew}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white font-semibold rounded-2xl shadow-lg"
            >
              Create First Summary
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {summaries.map((summary, idx) => (
                <motion.div
                  key={summary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-3xl shadow-lg border border-pink-100 group relative"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-xl flex items-center justify-center shadow-md">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs px-3 py-1 bg-white rounded-full border border-pink-200 text-gray-600">
                      {summary.content_type === 'pdf' ? '📄 PDF' : '📝 Text'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {summary.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {summary.summary_content}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    {formatDate(summary.created_at)}
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => onViewSummary(summary)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white text-sm font-medium rounded-xl shadow hover:shadow-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </motion.button>

                    <motion.button
                      onClick={() => handleDelete(summary.id)}
                      disabled={deletingId === summary.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white border-2 border-pink-200 text-gray-600 rounded-xl hover:bg-pink-50 transition-all disabled:opacity-50"
                    >
                      {deletingId === summary.id ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"
                        />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
