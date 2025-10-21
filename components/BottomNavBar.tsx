
import React from 'react';
import Icon from './Icon';

const BottomNavBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-[#2A2A39]/80 backdrop-blur-sm">
      <div className="flex justify-around items-center h-20">
        <button className="p-2 text-orange-500">
          <Icon name="home" className="w-7 h-7" />
        </button>
        <button className="p-2 text-gray-500 hover:text-white">
          <Icon name="search" className="w-7 h-7" />
        </button>
        <button className="p-2 text-gray-500 hover:text-white">
          <Icon name="library" className="w-7 h-7" />
        </button>
        <button className="p-2 text-gray-500 hover:text-white">
          <Icon name="menu" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default BottomNavBar;
