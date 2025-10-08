import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F4C2C2] via-[#FFB6C1] to-[#F4C2C2]" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="p-8">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-8 h-8 text-white" fill="currentColor" />
                </motion.div>

                <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] bg-clip-text text-transparent">
                  {isSignUp ? 'Join Us! ✨' : 'Welcome Back! 💖'}
                </h2>

                <p className="text-center text-gray-600 mb-8">
                  {isSignUp ? 'Create your account to get started' : 'Sign in to continue your journey'}
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-pink-50 border border-pink-200 rounded-2xl text-pink-600 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-pink-50 border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFB6C1] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-pink-50 border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFB6C1] focus:border-transparent transition-all"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                      />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                        <Sparkles className="w-4 h-4" />
                      </span>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setError('');
                    }}
                    className="text-gray-600 hover:text-[#F4C2C2] transition-colors text-sm"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-full flex items-center justify-center"
                      >
                        <Heart className="w-10 h-10 text-white" fill="currentColor" />
                      </motion.div>
                      <p className="text-2xl font-bold text-gray-800">Success! ✨</p>
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, x: 0, y: 0 }}
                          animate={{
                            scale: [0, 1, 0],
                            x: Math.cos(i * 36 * Math.PI / 180) * 100,
                            y: Math.sin(i * 36 * Math.PI / 180) * 100,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#FFB6C1] rounded-full"
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
