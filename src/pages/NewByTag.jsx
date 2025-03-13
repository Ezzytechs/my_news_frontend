import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchNewsByTag } from "../api/api"; // Import the API function
import ErrorModal from "../components/UI/Error"; // Import ErrorModal
import Spinner from "../components/UI/Spinner"; // Import Spinner

const NewsByTag = () => {
  const { tag } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const [isLoading, setIsLoading] = useState(true); // State for loading

  const fetchNews = async () => {
    try {
      const newData = await fetchNewsByTag(tag, page); // Fetch news by tag
      if (newData.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setNewsList((prev) => [...prev, ...newData]); // Append new data
        setPage((prevPage) => prevPage + 1); // Increment page
      }
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    // Reset states when the tag changes
    setNewsList([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    setError(null);

    // Fetch news for the new tag
    fetchNews();
  }, [tag]);

  const clearError = () => {
    setError(null); // Clear the error
  };

  if (isLoading) {
    return( <div className="grid place-items-center h-[50vh] w-full">
    <Spinner />
    </div>)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center capitalize">News for "{tag}"</h1>

      {/* Display ErrorModal if there's an error */}
      {error && <ErrorModal isOpen={error} onClose={clearError} />}

      {/* Infinite Scroll for News */}
      <InfiniteScroll
        dataLength={newsList.length}
        next={fetchNews}
        hasMore={hasMore}
        loader={
          <div className="text-center text-gray-500 overflow-hidden">
            <Spinner /> {/* Show spinner while loading more news */}
          </div>
        }
      >
        <div className="space-y-6">
          {newsList.map((news, index) => (
            <div
              key={news._id + index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                loading="lazy"
                src={`http://localhost:5000${news.pictures[0]}`}
                alt="News"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{news.title}</h2>
                <p className="text-gray-700 text-sm mb-2">{news.text}</p>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>👀 {news.views} Views</span>
                  <span>👍 {news.likes} Likes</span>
                  <span>👎 {news.dislikes} Dislikes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {/* Show a message if no news is found */}
      {!isLoading && newsList.length === 0 && (
        <p className="text-center text-gray-500">No news found for this tag.</p>
      )}
    </div>
  );
};

export default NewsByTag;