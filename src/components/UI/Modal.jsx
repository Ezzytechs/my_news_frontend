import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, onComfirmAction, message, index, title }) => {
  if (!isOpen) return null;
return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      {/* Animate the modal */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -50 }} 
        transition={{ duration: 0.3 }}
        className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
        <div className="text-gray-900 mb-4 text-justify">{message}</div>
        <button className="absolute top-2 right-2 text-red-400 hover:text-red-700" onClick={onClose}>
            &#10060;
          </button>
        <div className="flex justify-between space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
          <button onClick={onComfirmAction}className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
