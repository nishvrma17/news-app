import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const lastSearchRef = useRef('');

  const fetchNews = async (query = 'India') => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=fd8c0e08fce64802ba37e5e018be9b9d`
      );
      setArticles(res.data.articles);
      lastSearchRef.current = query; // store without re-render
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchNews(searchTerm);
    }
  };

  useEffect(() => {
    fetchNews(); // initial fetch
  }, []);

  // useMemo to optimize rendering
  const filteredArticles = useMemo(() => {
    return articles.filter((article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  return (
    <div className="container">
      <h1>📰 News App</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      <p style={{ fontStyle: 'italic' }}>Last searched: {lastSearchRef.current}</p>

      <div className="articles-grid">
        {filteredArticles.map((article, idx) => (
          <NewsCard key={idx} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
