import React, { useEffect, useState } from 'react';
import Graph from './components/Graph';
import Card from './components/Card';
import SuggestedProductCard from './components/SuggestedProductCard';
import './App.css';

function App() {
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [thefts, setThefts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

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
      .then(data => setThefts(data["Fish Section"])) // Adjust this based on the actual structure of your JSON file
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

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'dark' : ''}`}>
      <header>
        <h1 className={`text-4xl font-bold text-center mt-8 mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>
          ShopkAIper
        </h1>
      </header>
      <main className="space-y-8">
        {Object.keys(products).map((section, index) => (
          <section key={index}>
            <h2 className={`text-2xl font-semibold text-center mt-12 mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-800'} px-4 py-2 rounded-lg shadow-md`}>
              {section} Dwell Time
            </h2>
            <Graph data={products[section]} darkMode={darkMode} />
          </section>
        ))}
      </main>
      <section>
        <h2 className={`text-2xl font-semibold text-center mt-12 mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-800'} px-4 py-2 rounded-lg shadow-md`}>
          Co-Purchased Categories
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-lg shadow-md p-4`}>
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
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-red-100 text-black'} rounded-lg shadow-md p-4`}>
          {thefts.map((theft, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">Time: {theft[1]}</p>
              <p className="text-lg font-semibold">Product ID: {theft[0]}</p>
              <p className="text-lg font-semibold">Dwell Time: {theft[2]}</p>
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
