// SuggestedProductCard.js
import React from 'react';

const SuggestedProductCard = ({ product, darkMode }) => {
  // Adjust styles based on dark mode
  const containerClass = `bg-white p-4 rounded-lg shadow-lg ${darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`;
  const listItemClass = `text-lg ${darkMode ? 'dark:text-white' : ''}`;

  const { section, product: productName, data } = product;

  const cumulativeSum = data.reduce((acc, entry) => {
    const timestamp = new Date(entry[1]);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (true) {
      acc += entry[0];
    }
    return acc;
  }, 0);

  return (
    <div className={containerClass}>
      <h3 className="text-xl font-semibold mb-4">{section} - {productName}</h3>
      <p className="text-lg font-medium mb-2">Products sold recently: {cumulativeSum}</p>
      {/* <ul className="list-disc pl-5 space-y-1">
        {data.filter(entry => entry[0] !== 0).map((entry, index) => (
          <li key={index} className={listItemClass}>
            <span className="font-medium">Quantity: </span>{entry[0]}{' '}
            <span className="font-medium">Date: </span>{new Date(entry[1]).toLocaleString()}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default SuggestedProductCard;
