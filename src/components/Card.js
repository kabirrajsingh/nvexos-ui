// Card.js
import React from 'react';

const Card = ({ copurchased, darkMode }) => {
  // Adjust styles based on dark mode
  const listItemClass = `text-lg ${darkMode ? 'dark:text-white' : ''}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      {copurchased.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {copurchased.map((item, index) => (
            <li key={index} className={listItemClass}>{item}</li>
          ))}
        </ul>
      ) : (
        <div className={`text-gray-600 ${darkMode ? 'dark:text-gray-400' : ''}`}>
          No co-purchased items available
        </div>
      )}
    </div>
  );
};

export default Card;
