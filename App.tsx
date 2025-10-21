
import React, { useState } from 'react';
import type { Book } from './types';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';
import { MY_BOOKS, BEST_SELLERS } from './constants';

const App: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  return (
    <div className="bg-gray-900 flex justify-center items-start min-h-screen">
      <div className="w-full max-w-sm mx-auto font-sans relative">
        {selectedBook ? (
          <DetailScreen book={selectedBook} onBack={handleBack} />
        ) : (
          <HomeScreen allBooks={[...MY_BOOKS, ...BEST_SELLERS]} onSelectBook={handleSelectBook} />
        )}
      </div>
    </div>
  );
};

export default App;
