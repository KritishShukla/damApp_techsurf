import { TrashIcon, PencilIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SinglePost({
  className,
  post,
  deletePostClicked,
  editImageClicked,
}) {
  const {
    _id,
    imageName,
    title,
    caption,
    created,
    imageUrl,
    lastModified
  } = post;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 20, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

const detailsCardVariants = {
  hidden: { width: '0%' },
  visible: { width: '50%', transition: { duration: 0.5 } },
  exit: { width: '0%', transition: { duration: 0.5 } },
};
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`bg-transparent shadow-lg rounded-lg ${className}`}
      style={{ maxWidth: isExpanded ? 800 : 270 }}
    >
      <div className="p-4 relative">
        <div className={`flex space-x-4 ${isExpanded ? 'rounded-lg' : ''}`}>
          <motion.img
            className={`rounded-lg w-full ${isExpanded ? 'w-1/2' : 'w-full'}`}
            src={imageUrl}
            alt="Post"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
          />
         

         <motion.div
          variants={detailsCardVariants}
          initial="hidden"
          animate={isExpanded ? 'visible' : 'hidden'}
          exit="hidden"
          className={`rounded-lg bg-gray-200 p-4 overflow-y-auto ${
            isExpanded ? 'block' : 'hidden'
          }`}
          >
            <p className="text-base mt-1">
            <span className="font-bold">Title:</span> {title}
            </p>
            <p className="text-xs text-gray-500 mt-1">Created: {new Date(created).toLocaleString()}</p>
            <p className="text-base mt-1">
            <span className="font-bold">Caption:</span> {caption}
            </p>
            <p className="text-xs text-gray-500 mt-1">Post ID: {_id}</p>
          
            <p className="text-base mt-1">
            <span className="font-bold">Last Modified: </span> {lastModified}
            </p>
           
            
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => editImageClicked({ _id, imageName })}
                className="flex items-center text-gray-600 hover:text-gray-800 transition duration-300  "
              >
              <PencilIcon className='cursor-pointer hover:text-gray-900 active:text-gray-700 h-6 w-6 text-gray-700' />
               <span className="text-xs mt-1">Edit</span>
              </button>
              <button
                onClick={() => deletePostClicked({ _id })}
                className="flex items-center text-red-600 hover:text-red-800 transition duration-300"
              >
                <TrashIcon className="h-5 w-5" />
                <span className="ml-1">Delete</span>
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 rounded-r-full p-2 cursor-pointer`}
          onClick={toggleExpand}
          initial={{ rotate: 0 }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
