
import React, { useState } from 'react';
import type { Book } from './types';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';
import ReadingScreen from './components/ReadingScreen';
import { MY_BOOKS, BEST_SELLERS } from './constants';

type View = 'home' | 'detail' | 'reading';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  const handleSelectBook = (book: Book) => {
    setActiveBook(book);
    setView('detail');
  };

  const handleStartReading = (book: Book) => {
    setActiveBook(book);
    setView('reading');
  }

  const handleBackFromDetail = () => {
    setActiveBook(null);
    setView('home');
  };

  const handleBackFromReading = () => {
    setView('detail');
  }

  const renderContent = () => {
    if (view === 'reading' && activeBook) {
      return <ReadingScreen book={activeBook} onBack={handleBackFromReading} />;
    }
    
    if (view === 'detail' && activeBook) {
      return <DetailScreen book={activeBook} onBack={handleBackFromDetail} onStartReading={handleStartReading} />;
    }

    return <HomeScreen allBooks={[...MY_BOOKS, ...BEST_SELLERS]} onSelectBook={handleSelectBook} />;
  }

  return (
    <div className="bg-gray-900 flex justify-center items-start min-h-screen">
      <div className="w-full max-w-sm mx-auto font-sans relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
