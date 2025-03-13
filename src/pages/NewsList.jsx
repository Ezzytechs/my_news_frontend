import { useEffect, useState } from "react";
import { fetchNews } from "../api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import ErrorModal from "../components/UI/Error";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const newNews = await fetchNews(page);
      if (newNews.length === 0) setHasMore(false);
      setNews((prev) => [...prev, ...newNews]);
      setPage(page + 1);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  const clearError = () => {
    setError(null);
  };

  const loading = (
    <div className="grid place-items-center h-full w-full overflow-hidden">
      <Spinner />
    </div>
  );

  return (
    <div className="container mx-auto p-4 min-h-[70vh]">
      <h1 className="text-2xl font-bold mb-4">News</h1>
      {error && <ErrorModal isOpen={error} onClose={clearError} />} {/* Display ErrorModal if there's an error */}
      <InfiniteScroll
        dataLength={news.length}
        next={loadNews}
        hasMore={hasMore}
        loader={loading}
      >
        {news.map((n) => (
          <div key={n._id} className="border p-4 mb-4 flex">
            {/* Image on the left */}
            {n.pictures && n.pictures.length > 0 && (
              <div className="w-1/4 h-32 mr-4">
                <img
                  src={`http://localhost:5000${n.pictures[0]}`}
                  alt={n.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
            {/* News content on the right */}
            <div className="flex-1">
              <h2 className="text-xl font-bold">{n.title}</h2>
              <p>{n.text.substring(0, 100)}...</p>
              <div className="text-sm text-gray-500">
                Tags:{" "}
                {n.tags.map((tag) => (
                  <Link key={tag} to={`/news/tags/${tag}`} className="mr-2 capitalize text-blue-400 hover:text-blue-900">
                    {tag}
                  </Link>
                ))}
              </div>
              <Link to={`/news/${n._id}`} className="text-blue-500 hover:text-blue-900">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NewsList;