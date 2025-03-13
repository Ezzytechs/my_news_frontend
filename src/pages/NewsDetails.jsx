import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsById, likeNews, disLikeNews } from "../api/api";
import { io } from "socket.io-client";
import ErrorModal from "../components/UI/Error"; // Import ErrorModal
import Spinner from "../components/UI/Spinner"; // Import Spinner

const socket = io("http://localhost:5000"); // Connect to the Socket.IO server

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null); // State for error handling
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const newsData = await fetchNewsById(id); // Fetch news data
        setNews(newsData); // Set news data
        setIsLoading(false); // Set loading to false
      } catch (err) {
        setError(err.message || "Something went wrong!"); // Set error message
        setIsLoading(false); // Set loading to false
      }
    };

    fetchNewsData(); // Call the fetch function

    // Listen for real-time like updates
    socket.on("updateLikes", (newsId) => {
      if (newsId === id) {
        setNews((prev) => ({ ...prev, likes: prev.likes + 1 }));
      }
    });

    // Listen for real-time dislike updates
    socket.on("updateDisLikes", (newsId) => {
      if (newsId === id) {
        setNews((prev) => ({ ...prev, dislikes: prev.dislikes + 1 }));
      }
    });

    // Clean up event listeners on unmount
    return () => {
      socket.off("updateLikes");
      socket.off("updateDisLikes");
    };
  }, [id]);

  const handleLike = async () => {
    try {
      await likeNews(id); // Update likes in the backend
      socket.emit("likeNews", id); // Emit event to update likes in real-time
    } catch (err) {
      setError(err.message || "Failed to like the news."); // Handle like error
    }
  };

  const handleDisLike = async () => {
    try {
      await disLikeNews(id); // Update dislikes in the backend
      socket.emit("disLikeNews", id); // Emit event to update dislikes in real-time
    } catch (err) {
      setError(err.message || "Failed to dislike the news."); // Handle dislike error
    }
  };

  const clearError = () => {
    setError(null); // Clear the error
  };

  if (isLoading) {
    return <div className="grid place-items-center h-[50vh] w-full">
      <Spinner />
      </div>
  }

  if (!news) {
    return <p>No news found.</p>; // Fallback if news is not available
  }

  return (
    <div className="container mx-auto text-center p-4 min-h-[70vh]">
      {error && <ErrorModal isOpen={error} onClose={clearError} />}
      
      <div className="w-2/5 mx-auto">
      <img
        className="mx-auto rounded-lg"
        src={`http://localhost:5000${news.pictures[0]}`}
        alt={news._id}
        />
        <div className="flex justify-between px-1">
      <p className="text-sm text-left text-gray-500">Tags: {news.tags.join(", ")}</p>
      <p className="text-gray-600">Views: {news.views}</p>
        </div>
      </div>
      <h1 className="text-2xl font-bold">{news.title}</h1>
      <p>{news.text}</p>
      <div className="flex justify-end gap-8 w-2/5 mx-auto">

      <button
        onClick={handleLike}
        className="bg-blue-500 text-white px-4  rounded-lg py-2 mt-2 mx-4"
        >
        Like ({news.likes})
      </button>
      <button
        onClick={handleDisLike}
        className="bg-blue-500 text-white  rounded-lg px-4 py-2 mt-2"
        >
        Dislike ({news.dislikes})
      </button>
        </div>
    </div>
  );
};

export default NewsDetail;