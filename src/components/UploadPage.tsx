import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Type, Sparkles, X } from 'lucide-react';

interface UploadPageProps {
  onAnalyze: (content: string, type: 'pdf' | 'text') => void;
}

export const UploadPage = ({ onAnalyze }: UploadPageProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [uploadType, setUploadType] = useState<'pdf' | 'text'>('pdf');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadType('pdf');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadType('pdf');
    }
  };

  const handleAnalyze = () => {
    if (uploadType === 'pdf' && selectedFile) {
      onAnalyze(selectedFile.name, 'pdf');
    } else if (uploadType === 'text' && textContent.trim()) {
      onAnalyze(textContent, 'text');
    }
  };

  const canAnalyze = (uploadType === 'pdf' && selectedFile) || (uploadType === 'text' && textContent.trim());

  return (
    <div className="min-h-screen bg-white overflow-hidden relative pt-24">
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
            <Sparkles className="w-4 h-4 text-[#FFB6C1] opacity-20" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] bg-clip-text text-transparent">
            Upload Your Notes 📝
          </h1>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Choose how you'd like to share your notes with us!
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {[
              { type: 'pdf' as const, icon: FileText, label: 'PDF File' },
              { type: 'text' as const, icon: Type, label: 'Text Input' }
            ].map((option) => (
              <motion.button
                key={option.type}
                onClick={() => {
                  setUploadType(option.type);
                  setSelectedFile(null);
                  setTextContent('');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                  uploadType === option.type
                    ? 'bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white shadow-lg'
                    : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                }`}
              >
                <option.icon className="w-5 h-5" />
                {option.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {uploadType === 'pdf' ? (
              <motion.div
                key="pdf"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  whileHover={{ scale: 1.02 }}
                  className={`relative border-3 border-dashed rounded-3xl p-16 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-[#FFB6C1] bg-pink-50 scale-105'
                      : 'border-pink-200 bg-gradient-to-br from-pink-50 to-white'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {selectedFile ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <FileText className="w-10 h-10 text-white" />
                      </motion.div>
                      <p className="text-xl font-semibold text-gray-800 mb-2">{selectedFile.name}</p>
                      <p className="text-gray-600 mb-4">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-[#F4C2C2] hover:text-[#FFB6C1] font-medium flex items-center gap-2 mx-auto"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <motion.div
                        animate={{
                          y: [0, -15, 0],
                          rotate: isDragging ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#F4C2C2] to-[#FFB6C1] rounded-3xl flex items-center justify-center shadow-xl"
                      >
                        <Upload className="w-12 h-12 text-white" strokeWidth={2} />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        Drop your PDF here! ✨
                      </h3>
                      <p className="text-gray-600 mb-6">
                        or click the button below to browse
                      </p>

                      <motion.button
                        onClick={() => fileInputRef.current?.click()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                      >
                        Browse Files
                      </motion.button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 border border-pink-100 shadow-lg"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-5xl text-center mb-6"
                >
                  ✍️
                </motion.div>

                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Paste your notes here... ✨"
                  rows={12}
                  className="w-full px-6 py-5 bg-white border-2 border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFB6C1] focus:border-transparent transition-all resize-none text-gray-700 leading-relaxed"
                />

                <p className="text-right text-gray-500 mt-3 text-sm">
                  {textContent.length} characters
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              whileHover={canAnalyze ? { scale: 1.05, y: -5 } : {}}
              whileTap={canAnalyze ? { scale: 0.98 } : {}}
              animate={canAnalyze ? { boxShadow: ['0 0 0 0 rgba(255, 182, 193, 0.4)', '0 0 0 15px rgba(255, 182, 193, 0)'] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`px-16 py-5 text-xl font-bold rounded-full shadow-xl transition-all duration-300 ${
                canAnalyze
                  ? 'bg-gradient-to-r from-[#F4C2C2] to-[#FFB6C1] text-white hover:shadow-2xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center gap-3">
                Analyze Notes
                <Sparkles className="w-6 h-6" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
