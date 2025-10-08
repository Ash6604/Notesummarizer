import { motion } from 'framer-motion';
import { Home, Clock, LayoutDashboard, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onNavigate('intro');
  };

  const navItems = [
    { page: 'home' as PageType, icon: Home, label: 'Home' },
    { page: 'dashboard' as PageType, icon: LayoutDashboard, label: 'Dashboard' },
    { page: 'upload' as PageType, icon: Clock, label: 'History' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-xl flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">Notes Summarizer</span>
          </motion.div>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                  currentPage === item.page
                    ? 'bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white shadow-lg'
                    : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                }`}
              >
                <item.icon className="w-5 h-5" strokeWidth={2} />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="text-sm text-gray-600 hidden md:block">
                  <span className="font-medium">{user.email}</span>
                </div>
                <motion.button
                  onClick={handleSignOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-pink-200 text-gray-700 rounded-2xl font-medium hover:bg-pink-50 transition-all shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
