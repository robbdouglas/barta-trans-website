import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";

interface News {
  _id: string;
  title: string;
  content: string;
  author: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const port = import.meta.env.VITE_REACT_APP_PORT || 4200;
  const token = localStorage.getItem("token");

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${port}/news/news`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setNews(response.data);
      } else {
        console.error("Error: Expected array for news");
        setNews([]); // Set empty array to avoid issues
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]); // Set empty array to avoid issues
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <Header />
      <section className="news-container">
        <h1>News</h1>
        <ul>
          {news.map((newsItem) => (
            <li key={newsItem._id}>
              <h2>{newsItem.title}</h2>
              <p>{newsItem.content}</p>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default News;
