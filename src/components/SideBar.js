import React from 'react';

const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
const regions = ['in', 'us', 'gb', 'au', 'ca'];

const Sidebar = ({ setCategory, setRegion, fetchNews }) => {
  const handleCategoryClick = (cat) => {
    setCategory(cat);
    fetchNews('', cat);
  };
  const handleRegionClick = (reg) => {
    setRegion(reg);
    fetchNews('', '', reg);
  };

  return (
    <div className="sidebar">
      <h2>Categories</h2>
      {categories.map((cat, idx) => (
        <button key={idx} onClick={() => handleCategoryClick(cat)}>
          {cat}
        </button>
      ))}
      <h2>Regions</h2>
      {regions.map((reg, idx) => (
        <button key={idx} onClick={() => handleRegionClick(reg)}>
          {reg.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;

