import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsTable from "./Table";
import Modal from "../UI/Modal";
import ErrorModal from "../UI/Error";
import { fetchNewsStats, deleteNews } from "../../api/api"; 

const Statistics = () => {
  const [newsStats, setNewsStats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deleteNewsId, setDeleteNewsId] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  // Fetch news statistics
  const loadNewsStats = async () => {
    try {
      const data = await fetchNewsStats(page);
      if (data.length === 0) setHasMore(false); // No more data to load
      setNewsStats((prev) => [...prev, ...data]); // Append new data
      setPage((prevPage) => prevPage + 1); // Increment page
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  useEffect(() => {
    loadNewsStats();
  }, []);

  // Toggle the delete confirmation modal
  const toggleModalHandler = (id) => {
    setDeleteNewsId(id);
    setToggleModal(!toggleModal);
  };

  // Delete a news item
  const deleteNewsHandler = async () => {
    setToggleModal(!toggleModal); // Close the confirmation modal
    try {
      console.log(deleteNewsId)
      await deleteNews(deleteNewsId); 
      setNewsStats(newsStats.filter((news) => news._id !== deleteNewsId)); // Update the news list
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  // Clear the error
  const clearError = () => {
    setError(null);
  };

  return (
    <div className="p-4">
      {/* Confirmation Modal for Deleting News */}
      <Modal
        title={"Confirm News Deletion"}
        message={"Are you sure you want to delete this news?"}
        isOpen={toggleModal}
        onComfirmAction={deleteNewsHandler}
        onClose={toggleModalHandler}
      />

      {/* Error Modal */}
      <ErrorModal
        title={"Error"}
        message={error}
        isOpen={!!error}
        onClose={clearError}
      />

      {/* Infinite Scroll for News Statistics */}
      <InfiniteScroll
        dataLength={newsStats.length}
        next={loadNewsStats}
        hasMore={hasMore}
        loader={<p className="text-center overflow-hidden">Loading more news...</p>}
      >
       
        <NewsTable newsStats={newsStats} onDeleteNews={toggleModalHandler} />
      </InfiniteScroll>
    </div>
  );
};

export default Statistics;