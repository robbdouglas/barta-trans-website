import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import "../styles/News.css";
import news_banner from "../assets/imgs/DALL·E 2024-06-04 10.03.45 - A news page banner for a truck transport company. The banner should feature a modern, professional design with a large, powerful truck in the center, .webp";

interface News {
  _id: string;
  title: string;
  content: string;
  author: string;
}

// Styled Components für Spinner
const SpinnerContainer = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 100px auto;
`;

const bounce = keyframes`
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

const Bounce1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounce} 2s infinite ease-in-out;
`;

const Bounce2 = styled(Bounce1)`
  animation-delay: -1s;
`;

const News: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Lade-Status
  const port = import.meta.env.VITE_REACT_APP_PORT || 4200;
  const token = localStorage.getItem("token");
  const { i18n } = useTranslation();

  const fetchNews = async () => {
    setLoading(true); // Setze den Lade-Status auf true, bevor die Anfrage gestartet wird
    try {
      const response = await axios.get(`${port}/news/news`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { lang: i18n.language }, // Sprache an die Backend-Anfrage anhängen
      });
      if (Array.isArray(response.data)) {
        setNews(response.data);
      } else {
        console.error("Error: Expected array for news");
        setNews([]); // Setze ein leeres Array, um Probleme zu vermeiden
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]); // Setze ein leeres Array, um Probleme zu vermeiden
    } finally {
      setLoading(false); // Setze den Lade-Status auf false, wenn die Anfrage abgeschlossen ist
    }
  };

  useEffect(() => {
    fetchNews();
  }, [i18n.language]); // Lade die Nachrichten erneut, wenn sich die Sprache ändert

  return (
    <div>
      <Header />

      <section className="news-container">
        <div className="news-banner-container">
          <img
            className="news-banner"
            src={news_banner}
            alt="truck_with_vinyl"
          />
        </div>
        <h1>News</h1>
        {loading ? (
          <SpinnerContainer>
            <Bounce1 />
            <Bounce2 />
          </SpinnerContainer>
        ) : (
          <ul className="news-ul">
            {news.map((newsItem) => (
              <li className="news-li" key={newsItem._id}>
                <h2>{newsItem.title}</h2>
                <span>____________</span>
                <p>{newsItem.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default News;
