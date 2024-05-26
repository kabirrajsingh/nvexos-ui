import React from 'react';

const Card = ({ copurchased, frequency }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-72">
      
      <ul className="list-disc list-inside mb-4">
        {copurchased.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
        {frequency} times
      </span>
    </div>
  );
};

export default Card;
