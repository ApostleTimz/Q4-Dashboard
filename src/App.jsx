import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Questions from './pages/Questions';
import QuestionDetail from './pages/QuestionDetail';
import MyConvictions from './pages/MyConvictions';
import HowItWorks from './pages/HowItWorks';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleNavigate = (key) => {
    setSelectedQuestion(null);
    setPage(key);
  };

  const handleOpenQuestion = (id) => {
    setSelectedQuestion(id);
    setPage('question-detail');
  };

  const activeNav = page === 'question-detail' ? 'questions' : page;

  return (
    <div className="flex min-h-screen w-full items-stretch bg-bg">
      <Sidebar active={activeNav} onNavigate={handleNavigate} />
      <main className="min-h-screen flex-1 px-6 py-7 sm:px-10 sm:py-8">
        <div className="mx-auto max-w-6xl">
          {page === 'dashboard' && (
            <Dashboard onOpenQuestion={handleOpenQuestion} onNavigate={handleNavigate} />
          )}
          {page === 'questions' && <Questions onOpenQuestion={handleOpenQuestion} />}
          {page === 'question-detail' && (
            <QuestionDetail questionId={selectedQuestion} onBack={() => handleNavigate('questions')} />
          )}
          {page === 'convictions' && <MyConvictions />}
          {(page === 'results' || page === 'leaderboard' || page === 'rewards') && (
            <ComingSoon page={page} />
          )}
          {page === 'how' && <HowItWorks onNavigate={handleNavigate} />}
        </div>
      </main>
    </div>
  );
}

function ComingSoon({ page }) {
  const titles = {
    results: 'Results',
    leaderboard: 'Leaderboard',
    rewards: 'Rewards',
  };
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-2xl font-extrabold text-ink">{titles[page]}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">This section is coming soon. Check back after your next conviction.</p>
    </div>
  );
}
