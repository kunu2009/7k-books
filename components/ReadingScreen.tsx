
import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Book } from '../types';
import Icon from './Icon';

interface ReadingScreenProps {
  book: Book;
  onBack: () => void;
}

const parseMarkdown = (text: string): string => {
  let html = '';
  const lines = text.split('\n');
  let inList = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('#### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h4 class="text-lg font-semibold mt-4 mb-2 text-gray-300">${trimmedLine.substring(5)}</h4>`;
    } else if (trimmedLine.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h3 class="text-xl font-bold mt-6 mb-3 text-gray-200">${trimmedLine.substring(4)}</h3>`;
    } else if (trimmedLine.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h2 class="text-2xl font-bold mt-8 mb-4 text-white">${trimmedLine.substring(3)}</h2>`;
    } else if (trimmedLine.startsWith('- ')) {
      if (!inList) { html += '<ul class="list-disc list-inside space-y-2 mb-4">'; inList = true; }
      html += `<li>${trimmedLine.substring(2)}</li>`;
    } else if (trimmedLine === '---') {
      if (inList) { html += '</ul>'; inList = false; }
      html += '<hr class="my-6 border-gray-700" />';
    } else if (trimmedLine === '') {
      if (inList) { html += '</ul>'; inList = false; }
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<p class="mb-4 leading-relaxed">${trimmedLine}</p>`;
    }
  }

  if (inList) {
    html += '</ul>';
  }

  return html;
};


const ReadingScreen: React.FC<ReadingScreenProps> = ({ book, onBack }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showChapterList, setShowChapterList] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const chapter = book.chapters[currentChapterIndex];
  const renderedContent = useMemo(() => parseMarkdown(chapter.content), [chapter]);

  const goToChapter = (index: number) => {
    if (index >= 0 && index < book.chapters.length) {
      setCurrentChapterIndex(index);
      setShowChapterList(false);
      contentRef.current?.scrollTo(0, 0);
    }
  };
  
  useEffect(() => {
    // Scroll to top when chapter changes
    contentRef.current?.scrollTo(0, 0);
  }, [currentChapterIndex]);

  return (
    <div className="bg-[#1F1F2B] text-gray-400 min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <header className="flex-shrink-0 bg-[#2A2A39]/80 backdrop-blur-sm p-4 flex justify-between items-center z-20">
        <button onClick={onBack} className="p-2 -ml-2">
          <Icon name="back" className="w-6 h-6 text-white" />
        </button>
        <div className="text-center text-white">
          <h1 className="font-semibold truncate w-48">{book.title}</h1>
          <p className="text-xs text-gray-400">Chapter {currentChapterIndex + 1}/{book.chapters.length}</p>
        </div>
        <button onClick={() => setShowChapterList(true)} className="p-2 -mr-2">
          <Icon name="list" className="w-6 h-6 text-white" />
        </button>
      </header>
      
      {/* Content */}
      <main ref={contentRef} className="flex-grow overflow-y-auto p-6">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">{chapter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: renderedContent }} className="prose prose-invert" />
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 bg-[#2A2A39]/80 backdrop-blur-sm p-4 flex justify-between items-center z-10">
        <button 
          onClick={() => goToChapter(currentChapterIndex - 1)} 
          disabled={currentChapterIndex === 0}
          className="px-4 py-2 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          Previous
        </button>
        <div className="text-sm text-gray-300">
          {Math.round(((currentChapterIndex + 1) / book.chapters.length) * 100)}%
        </div>
        <button 
          onClick={() => goToChapter(currentChapterIndex + 1)} 
          disabled={currentChapterIndex === book.chapters.length - 1}
          className="px-4 py-2 bg-orange-500 text-black font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          Next
        </button>
      </footer>

      {/* Chapter List Modal */}
      {showChapterList && (
        <div className="fixed inset-0 bg-black/60 z-30 flex flex-col justify-end animate-fade-in" onClick={() => setShowChapterList(false)}>
          <div className="bg-[#2A2A39] rounded-t-2xl max-h-[70vh] flex flex-col animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">Chapters</h2>
                <button onClick={() => setShowChapterList(false)}><Icon name="close" className="w-6 h-6 text-gray-400" /></button>
            </div>
            <ul className="overflow-y-auto p-2">
              {book.chapters.map((chap, index) => (
                <li key={index}>
                  <button 
                    onClick={() => goToChapter(index)} 
                    className={`w-full text-left p-4 rounded-lg text-sm ${currentChapterIndex === index ? 'bg-orange-500/20 text-orange-400 font-semibold' : 'text-gray-300 hover:bg-gray-700/50'}`}
                  >
                    {index + 1}. {chap.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingScreen;
