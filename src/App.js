import React, { useEffect, useState } from 'react';
import Graph from './components/Graph';
import Card from './components/Card';
import SuggestedProductCard from './components/SuggestedProductCard';
import './App.css';

function App() {
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [thefts, setThefts] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [latestTheft, setLatestTheft] = useState(null);

  useEffect(() => {
    fetch('/categories.json')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        processSuggestedProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));

    fetch('/theft.json')
      .then(response => response.json())
      .then(data => {
        setThefts(data);
        findLatestTheft(data);
      })
      .catch(error => console.error('Error fetching thefts:', error));
  }, []);

  const processSuggestedProducts = (data) => {
    const result = [];
    for (const section in data) {
      for (const product in data[section]) {
        result.push({
          section,
          product,
          data: data[section][product]
        });
      }
    }
    setSuggestedProducts(result);
  };

  const findLatestTheft = (data) => {
    let latestTime = '';
    let latestTheft = null;
    for (const section in data) {
      data[section].forEach(theft => {
        if (theft[1] > latestTime) {
          latestTime = theft[1];
          latestTheft = theft;
        }
      });
    }
    setLatestTheft(latestTheft);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const toggleNotifications = () => {
    setShowNotifications(prevState => !prevState);
  };

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'dark' : ''}`}>
      <header>
        <h1 className={`text-4xl font-bold text-center mt-8 mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
          ShopkAIper
        </h1>
        <div className="absolute right-8 top-8">
          <button
            onClick={toggleNotifications}
            className="focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a2 2 0 100-4 2 2 0 000 4zM5 15a3 3 0 116 0H5zM3 7v1a4 4 0 007.035 2.471C11.457 11.497 14 13.438 14 16h-2c0-2.209-2.015-3.957-4-4.399V7a1 1 0 10-2 0zm10-1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-12 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">Latest Theft</h3>
                {latestTheft && (
                  <div className="mb-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-2">
                      <p className="text-sm font-semibold">Time: {latestTheft[1]}</p>
                      <p className="text-sm font-semibold">Z-Score: {latestTheft[2]}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="space-y-8">
        {Object.keys(products).map((section, index) => (
          <section key={index}>
            <h2 className={`text-2xl font-semibold text-center mt-12 mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-800'} px-4 py-2 rounded-lg shadow-md`}>
              {section} Dwell Time for 26-05-2024
            </h2>
            <Graph data={products[section]} darkMode={darkMode} />
          </section>
        ))}
      </main>
      <section>
        <h2 className={`text-2xl font-semibold text-center mt-12 mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-800'} px-4 py-2 rounded-lg shadow-md`}>
          Co-Purchased Categories
        </h2>
        <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-lg shadow-md p-4`}>
          {Object.keys(categories).map((section, index) => (
            // Only render the category if it has co-purchased products
            categories[section].length > 0 && (
              <div key={index} className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{section}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {categories[section].map((pair, idx) => (
                    <Card key={idx} copurchased={pair} darkMode={darkMode} />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>
      <section>
        <h2 className={`text-2xl font-semibold text-center mt-12 mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-purple-100 text-purple-800'} px-4 py-2 rounded-lg shadow-md`}>
          Suggested Products
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-lg shadow-md p-4`}>
          {suggestedProducts.map((item, index) => (
            <SuggestedProductCard key={index} product={item} darkMode={darkMode} />
          ))}
        </div>
      </section>
      <section>
  <h2 className={`text-2xl font-semibold text-center mt-12 mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-red-600 text-white'} px-4 py-2 rounded-lg shadow-md`}>
    Suspected Thefts
  </h2>
  <div className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-red-100 text-black'} rounded-lg shadow-md p-4`}>
    {Object.keys(thefts).map((sectionName, index) => (
      <div key={index} className="mb-4"> {/* Adjusted margin-bottom here */}
        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>{sectionName}</h3>
        {thefts[sectionName].map((theft, theftIndex) => (
          <div key={theftIndex} className="mb-4"> {/* Adjusted margin-bottom here */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">Time: {theft[1]}</p>
              {/* <p className="text-lg font-semibold">Level Of Interaction: {theft[0]}</p> */}
              <p className="text-lg font-semibold">Z-Score: {theft[2]}</p>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
</section>


      <button
        className={`fixed bottom-4 right-4 px-4 py-2 rounded-md ${darkMode ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default App;
