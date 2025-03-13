import { motion } from "framer-motion";

const ErrorModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.8 }} 
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-red-500"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl -m-2 font-bold text-center w-full text-red-600">{title || "Error!"}</h2>
          <button className="text-red-500 hover:text-red-700" onClick={onClose}>
          &#10060;
          </button>
        </div>

        <p className="text-gray-700 my-4">{message || "An unexpected error occurred. Please refresh your browser or check your network connectivity"}</p>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorModal;
