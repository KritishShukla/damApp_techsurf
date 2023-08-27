import { TrashIcon, PencilIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';

export default function SinglePost({
  className,
  post,
  likeClicked,
  commentClicked,
  editClicked,
  deletePostClicked,
  editImageClicked
}) {
  const { _id, caption, imageUrl, imageName } = post;

  return (
    <div className={`bg-white shadow-lg rounded-lg ${className}`} style={{ maxWidth: 400 }}>
      <div className="p-4">
        {/* Caption */}
        <p className="text-base font-bold mt-2">{caption}</p>

        {/* Card containing image and buttons */}
        <div className='flex flex-col items-center space-y-4 mt-4'>
          <img className="rounded-lg" width="300" height="300" src={imageUrl} alt="Post" />

          {/* Edit and Delete buttons */}
          <div className='flex flex-row items-center space-x-4'>
            <div className='flex flex-col items-center' onClick={() => editImageClicked({ _id, imageName })}>
              <PencilIcon className='cursor-pointer hover:text-gray-900 active:text-gray-700 h-6 w-6 text-gray-700' />
              <p className="text-xs mt-1">Edit</p>
            </div>
            <div className='flex flex-col items-center' onClick={() => deletePostClicked({ _id })}>
              <TrashIcon className='cursor-pointer hover:text-gray-900 active:text-gray-700 h-6 w-6 text-gray-700' />
              <p className="text-xs mt-1">Delete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
