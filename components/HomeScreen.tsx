
import React, { useState } from 'react';
import type { Book } from '../types';
import { MY_BOOKS, BEST_SELLERS } from '../constants';
import Icon from './Icon';
import BottomNavBar from './BottomNavBar';

interface HomeScreenProps {
  onSelectBook: (book: Book) => void;
  allBooks: Book[];
}

const BookCard: React.FC<{ book: Book; onSelect: (book: Book) => void; index: number }> = ({ book, onSelect, index }) => (
  <div 
    className="flex-shrink-0 w-32 mr-4 animate-fade-in-up" 
    style={{ animationDelay: `${index * 75}ms` }}
    onClick={() => onSelect(book)}
  >
    <img src={book.coverUrl} alt={book.title} className="w-full h-48 object-cover rounded-lg mb-2 shadow-lg" />
    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${book.progress || 0}%` }}></div>
    </div>
    <div className="flex items-center text-gray-400 text-xs">
      <Icon name="clock" className="w-3 h-3 mr-1" />
      <span>{book.timeLeft}</span>
      <span className="ml-auto">{book.progress}%</span>
    </div>
  </div>
);

const BestSellerCard: React.FC<{ book: Book; onSelect: (book: Book) => void; index: number }> = ({ book, onSelect, index }) => (
  <div 
    className="flex items-center mb-4 cursor-pointer animate-fade-in-up" 
    style={{ animationDelay: `${index * 75}ms` }}
    onClick={() => onSelect(book)}
  >
    <img src={book.coverUrl} alt={book.title} className="w-20 h-28 object-cover rounded-lg mr-4 shadow-md" />
    <div className="flex-grow">
      <h3 className="font-bold text-white">{book.title}</h3>
      <p className="text-sm text-gray-400 mb-2">{book.author}</p>
      <div className="flex items-center space-x-2">
        {book.tags.map(tag => (
          <span key={tag} className={`text-xs px-2 py-1 rounded-full ${
            tag === 'Drama' ? 'bg-blue-900/50 text-blue-300' :
            tag === 'Romance' ? 'bg-red-900/50 text-red-300' :
            tag === 'Adventure' ? 'bg-green-900/50 text-green-300' :
            'bg-gray-700 text-gray-300'
          }`}>{tag}</span>
        ))}
      </div>
    </div>
    <button className="text-gray-500 hover:text-white">
      <Icon name="bookmark" className="w-6 h-6" />
    </button>
  </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectBook }) => {
  const [activeTab, setActiveTab] = useState('Best Seller');
  const [searchQuery, setSearchQuery] = useState('');

  const lowercasedQuery = searchQuery.toLowerCase();
  
  const filteredMyBooks = MY_BOOKS.filter(book => 
    book.title.toLowerCase().includes(lowercasedQuery) || 
    book.author.toLowerCase().includes(lowercasedQuery)
  );
  
  const filteredBestSellers = BEST_SELLERS.filter(book => 
    book.title.toLowerCase().includes(lowercasedQuery) || 
    book.author.toLowerCase().includes(lowercasedQuery)
  );

  return (
    <div className="bg-[#1F1F2B] text-white min-h-screen pb-24">
      <div className="p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-400">Good Morning</p>
            <h1 className="text-2xl font-bold">Reader</h1>
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-sm font-bold py-2 px-4 rounded-full flex items-center">
            <span className="font-serif font-extrabold mr-1">K</span> 240 point
          </button>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="search" className="w-5 h-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search for a book or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-full py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                aria-label="Search books"
            />
            {searchQuery && (
                <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    aria-label="Clear search"
                >
                    <Icon name="close" className="w-5 h-5 text-gray-500 hover:text-white" />
                </button>
            )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 text-center mb-8">
          <div className="flex flex-col items-center">
            <button className="bg-gray-800 p-3 rounded-lg mb-2"><Icon name="claim" className="w-6 h-6 text-orange-400" /></button>
            <span className="text-xs text-gray-400">Claim</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="bg-gray-800 p-3 rounded-lg mb-2"><Icon name="getPoint" className="w-6 h-6 text-orange-400" /></button>
            <span className="text-xs text-gray-400">Get Point</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="bg-gray-800 p-3 rounded-lg mb-2"><Icon name="myCard" className="w-6 h-6 text-orange-400" /></button>
            <span className="text-xs text-gray-400">My Card</span>
          </div>
        </div>

        {/* My Book Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Book</h2>
            <a href="#" className="text-sm text-gray-400">see more</a>
          </div>
          <div className="flex overflow-x-auto pb-4" key={`my-books-${searchQuery}`}>
            {filteredMyBooks.length > 0 ? (
                filteredMyBooks.map((book, index) => <BookCard key={book.id} book={book} onSelect={onSelectBook} index={index} />)
            ) : (
                <p className="text-gray-400 w-full animate-fade-in-up">No books found.</p>
            )}
          </div>
        </section>

        {/* Best Seller Section */}
        <section>
          <div className="flex items-center border-b border-gray-700 mb-4">
            {['Best Seller', 'The Latest', 'Coming Soon'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 mr-6 text-sm font-semibold transition-colors duration-300 ${activeTab === tab ? 'text-white border-b-2 border-orange-500' : 'text-gray-500'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div key={`best-sellers-${searchQuery}`}>
            {filteredBestSellers.length > 0 ? (
                filteredBestSellers.map((book, index) => <BestSellerCard key={book.id} book={book} onSelect={onSelectBook} index={index} />)
            ) : (
                <p className="text-gray-400 text-center py-8 animate-fade-in-up">No books found.</p>
            )}
          </div>
        </section>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default HomeScreen;
