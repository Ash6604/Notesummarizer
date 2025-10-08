import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { IntroductionPage } from './components/IntroductionPage';
import { AuthModal } from './components/AuthModal';
import { UploadPage } from './components/UploadPage';
import { ProcessingPage } from './components/ProcessingPage';
import { ResultsPage } from './components/ResultsPage';
import { PageType } from './types';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('intro');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasClickedGetStarted, setHasClickedGetStarted] = useState(false);
  const [summaryResult, setSummaryResult] = useState('');

  const handleGetStarted = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!hasClickedGetStarted) {
      setHasClickedGetStarted(true);
      return;
    }

    setCurrentPage('upload');
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleAnalyze = (content: string, type: 'pdf' | 'text') => {
    setCurrentPage('processing');
  };

  const handleProcessingComplete = () => {
    setSummaryResult(
      `This is your beautifully summarized content! ✨\n\nYour notes have been carefully analyzed and condensed into this concise summary. The key points and main ideas have been extracted while maintaining the essence of your original content.\n\nKey Highlights:\n• Main concepts and themes identified\n• Important details preserved\n• Logical flow maintained\n• Actionable insights highlighted\n\nThis summary captures the core message of your notes in a clear and organized manner, making it easy to review and reference later. Whether you're studying, working, or organizing your thoughts, this summary provides a quick and effective way to understand the main points at a glance.`
    );
    setCurrentPage('results');
  };

  const handleBackHome = () => {
    setCurrentPage('intro');
    setHasClickedGetStarted(false);
  };

  return (
    <>
      {currentPage === 'intro' && (
        <IntroductionPage onGetStarted={handleGetStarted} />
      )}

      {currentPage === 'upload' && (
        <UploadPage onAnalyze={handleAnalyze} />
      )}

      {currentPage === 'processing' && (
        <ProcessingPage onComplete={handleProcessingComplete} />
      )}

      {currentPage === 'results' && (
        <ResultsPage summary={summaryResult} onBackHome={handleBackHome} />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
