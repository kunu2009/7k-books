
import React, { useState, useEffect } from 'react';
import type { Book } from '../types';
import Icon from './Icon';

interface DetailScreenProps {
  book: Book;
  onBack: () => void;
  onStartReading: (book: Book) => void;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ book, onBack, onStartReading }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleBackClick = () => {
    setIsExiting(true);
  };

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onBack();
      }, 300); // Corresponds to animation duration
      return () => clearTimeout(timer);
    }
  }, [isExiting, onBack]);

  return (
    <div className={`bg-gradient-to-b from-[#5E4A83] to-[#31254D] text-white min-h-screen ${isExiting ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <div className="p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <button onClick={handleBackClick} className="p-2 -ml-2">
            <Icon name="back" className="w-6 h-6" />
          </button>
          <h1 className="font-semibold">Detail Book</h1>
          <button className="p-2 -mr-2">
            <Icon name="more" className="w-6 h-6" />
          </button>
        </header>

        {/* Book Cover and Title */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
             <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-48 h-64 object-cover rounded-lg mx-auto shadow-2xl shadow-black/50"
             />
             <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
          </div>
          <h2 className="text-2xl font-bold mt-6">{book.title}</h2>
          <p className="text-md text-gray-300">{book.author}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-around bg-white/10 p-4 rounded-lg mb-8">
          <div className="text-center">
            <p className="text-sm text-gray-300">Rating</p>
            <p className="font-bold text-lg flex items-center justify-center">
              <Icon name="star" className="w-4 h-4 text-yellow-400 mr-1"/>
              {book.rating}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-300">Number of Page</p>
            <p className="font-bold text-lg">{book.pages}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-300">Language</p>
            <p className="font-bold text-lg">{book.language}</p>
          </div>
        </div>
      </div>

      {/* Description and Actions */}
      <div className="bg-[#1F1F2B] p-6 rounded-t-3xl flex-grow min-h-[30vh]">
        <h3 className="text-xl font-bold mb-3">Description</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          {book.description}
        </p>
        <div className="flex items-center space-x-4">
          <button className="p-4 bg-gray-800 rounded-lg text-gray-400 hover:text-white">
            <Icon name="bookmark" className="w-6 h-6" />
          </button>
          <button onClick={() => onStartReading(book)} className="flex-grow bg-[#FF7A51] text-black font-bold py-4 rounded-lg">
            Start Reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
