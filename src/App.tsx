import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { IntroductionPage } from './components/IntroductionPage';
import { HomePage } from './components/HomePage';
import { DashboardPage } from './components/DashboardPage';
import { AuthModal } from './components/AuthModal';
import { UploadPage } from './components/UploadPage';
import { ProcessingPage } from './components/ProcessingPage';
import { ResultsPage } from './components/ResultsPage';
import { Header } from './components/Header';
import { PageType, Summary } from './types';

interface AnalysisData {
  content: string;
  type: 'pdf' | 'text';
}

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('intro');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [currentSummary, setCurrentSummary] = useState<Summary | null>(null);

  useEffect(() => {
    if (user && currentPage === 'intro') {
      setCurrentPage('home');
    } else if (!user && currentPage !== 'intro') {
      setCurrentPage('intro');
    }
  }, [user]);

  const handleGetStarted = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setCurrentPage('home');
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setCurrentPage('home');
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const handleCreateNew = () => {
    setCurrentPage('upload');
    setAnalysisData(null);
    setCurrentSummary(null);
  };

  const handleAnalyze = (content: string, type: 'pdf' | 'text') => {
    setAnalysisData({ content, type });
    setCurrentPage('processing');
  };

  const handleProcessingComplete = () => {
    const mockSummary = `This is your beautifully summarized content! ✨\n\nYour notes have been carefully analyzed and condensed into this concise summary. The key points and main ideas have been extracted while maintaining the essence of your original content.\n\nKey Highlights:\n• Main concepts and themes identified\n• Important details preserved\n• Logical flow maintained\n• Actionable insights highlighted\n\nThis summary captures the core message of your notes in a clear and organized manner, making it easy to review and reference later. Whether you're studying, working, or organizing your thoughts, this summary provides a quick and effective way to understand the main points at a glance.`;

    setCurrentSummary({
      id: '',
      user_id: user?.id || '',
      title: analysisData?.content.substring(0, 50) || 'Untitled Summary',
      original_content: analysisData?.content || '',
      summary_content: mockSummary,
      content_type: analysisData?.type || 'text',
      original_length: analysisData?.content.length || 0,
      summary_length: mockSummary.length,
      created_at: new Date().toISOString()
    });

    setCurrentPage('results');
  };

  const handleViewSummary = (summary: Summary) => {
    setCurrentSummary(summary);
    setCurrentPage('results');
  };

  const handleBackHome = () => {
    setCurrentPage('home');
    setAnalysisData(null);
    setCurrentSummary(null);
  };

  const showHeader = user && currentPage !== 'intro' && currentPage !== 'processing';

  return (
    <>
      {showHeader && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {currentPage === 'intro' && (
        <IntroductionPage onGetStarted={handleGetStarted} />
      )}

      {currentPage === 'home' && (
        <HomePage onCreateNew={handleCreateNew} onViewDashboard={() => setCurrentPage('dashboard')} />
      )}

      {currentPage === 'dashboard' && (
        <DashboardPage onViewSummary={handleViewSummary} onCreateNew={handleCreateNew} />
      )}

      {currentPage === 'upload' && (
        <UploadPage onAnalyze={handleAnalyze} />
      )}

      {currentPage === 'processing' && (
        <ProcessingPage onComplete={handleProcessingComplete} />
      )}

      {currentPage === 'results' && currentSummary && (
        <ResultsPage
          summary={currentSummary}
          onBackHome={handleBackHome}
        />
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
