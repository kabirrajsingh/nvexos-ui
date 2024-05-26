import React from 'react';
import Graph from './components/Graph';
import Card from './components/Card';
import './App.css';

const data = {
  categories: [
    { category_id: 1, category_name: 'Electronics', dwell_time_seconds: 1245 },
    { category_id: 2, category_name: 'Clothing', dwell_time_seconds: 987 },
    { category_id: 3, category_name: 'Home & Kitchen', dwell_time_seconds: 654 },
    { category_id: 4, category_name: 'Books', dwell_time_seconds: 0 },
    { category_id: 5, category_name: 'Toys & Games', dwell_time_seconds: 432 },
    { category_id: 6, category_name: 'Health & Beauty', dwell_time_seconds: 1098 },
    { category_id: 7, category_name: 'Sports & Outdoors', dwell_time_seconds: 567 },
    { category_id: 8, category_name: 'Automotive', dwell_time_seconds: 0 },
    { category_id: 9, category_name: 'Grocery', dwell_time_seconds: 375 },
    { category_id: 10, category_name: 'Pet Supplies', dwell_time_seconds: 810 },
  ],
  co_purchased_categories: [
    { copurchased: ['Electronics', 'Accessories'], frequency: 9 },
    { copurchased: ['Clothing', 'Shoes'], frequency: 10 },
    { copurchased: ['Home & Kitchen', 'Furniture'], frequency: 6 },
    { copurchased: ['Books', 'Stationery'], frequency: 4 },
    { copurchased: ["Toys & Games", "Children's Books"], frequency: 8 },
    { copurchased: ['Health & Beauty', 'Personal Care'], frequency: 7 },
    { copurchased: ['Sports & Outdoors', 'Fitness Equipment'], frequency: 5 },
    { copurchased: ['Automotive', 'Tools & Equipment'], frequency: 3 },
    { copurchased: ['Grocery', 'Household Supplies'], frequency: 10 },
    { copurchased: ['Pet Supplies', 'Pet Food'], frequency: 6 },
  ],
};

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-8 bg-green-100 text-green-800 px-6 py-4 rounded-lg shadow-lg">
        Category Dwell Time & Co-Purchases
      </h1>
      <Graph data={data} />
      <h2 className="text-2xl font-semibold text-center mt-12 mb-6 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-md">
        Co-Purchased Categories
      </h2>
      <div className="flex flex-wrap justify-center">
        {data.co_purchased_categories.map((item, index) => (
          <Card key={index} copurchased={item.copurchased} frequency={item.frequency} />
        ))}
      </div>
    </div>
  );
}

export default App;
