"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Loader from "./Loader";

// Your API key from Mediastack
const API_KEY = '8d2c45cc4ed9b0a4e46f72b9e84a3782'; // Replace with your actual Mediastack API key

const TechNewsCard = ({ news }) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollInterval, setScrollInterval] = useState(null);

  const handleMouseEnter = () => {
    if (!hasScrolled) {
      setIsHovered(true);
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: 1, behavior: 'auto' });
          }
        }, 50);
        setScrollInterval(interval);
      }, 2000); // Starts after 2 seconds
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    clearInterval(scrollInterval); // Stop scrolling
    setHasScrolled(true); // Prevent further auto-scroll
  };

  return (
    <a href={news.url} target="_blank" rel="noopener noreferrer" className="hover:underline news-card">
      <div className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={news.image || "/images/default-news.jpg"} // Mediastack uses 'image' for image URL
            alt={news.title}
            layout="fill"
            objectFit="cover"
            quality={50}
          />
        </div>
        <div
          className="rounded-lg shadow-lg -mt-4 max-h-[10rem] overflow-y-scroll no-scrollbar scroll-container"
          onMouseEnter={(e) => startAutoScroll(e.currentTarget)}
          onMouseLeave={(e) => stopAutoScroll(e.currentTarget)}
          style={{ backgroundImage: `url(${news.image})` }}
        >
          <div className="inset-0 p-6 pt-4 bg-white/70 backdrop-blur-md rounded-lg shadow-lg flex flex-col justify-between">
            <div className="justify-between flex mb-2 hover:text-white hover:mix-blend-difference">
              <span className="text-sm text-gray-500">{news.source}</span>
              <span className="text-sm text-gray-400">
                {new Date(news.published_at).toLocaleDateString()} {/* Mediastack uses 'published_at' */}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{news.title}</h3>
            <p className="text-gray-600 mt-2">{news.description}</p>
            <div className="flex justify-between mt-3 text-gray-500">
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

let scrollInterval;
let scrollTimeout;
let hasScrolled = false;

function startAutoScroll(container) {
  if (hasScrolled) return; // Prevent further auto-scroll if already scrolled
  scrollInterval = setTimeout(() => {
    container.scrollInterval = setInterval(() => {
      container.scrollBy({
        top: 1, // Scroll down by 1 pixel at a time for slower scrolling
        behavior: 'auto' // No animation for smoother effect
      });
    }, 25); // 50ms interval for slow scrolling
  }, 1000); // Delay of 2 seconds before starting to scroll
}

function stopAutoScroll(container) {
  clearTimeout(scrollTimeout); // Stop the delay timer
  clearInterval(container.scrollInterval); // Stop the scrolling but don't reset position
  hasScrolled = true;
}

const TechNewsFeed = ({ cards, columns }) => {
  const [techNews, setTechNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://api.mediastack.com/v1/news?access_key=${API_KEY}&categories=technology&languages=en`
        );
        const data = await response.json();

        // Adjust Mediastack response structure (if necessary)
        const articlesWithImages = data.data.filter(article => article.image); // Mediastack uses 'image'

        const sixArticles = articlesWithImages.slice(0, cards); // Take only the first 'cards' number of articles
        setTechNews(sixArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
      setLoading(false);
    };

    fetchTechNews();
  }, []);

  if (loading) {
    return (
      <div>
        <p className="text-center text-xl mt-20 mb-5">Loading news... </p>
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 py-0 bg-gray-100">
      <div className={`grid grid-cols-${columns} gap-6`}>
        {techNews.map((newsItem, index) => (
          <TechNewsCard key={index} news={newsItem} />
        ))}
      </div>
    </div>
  );
};

export default TechNewsFeed;
