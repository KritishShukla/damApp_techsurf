import React, { useState } from 'react';
import ImageCompressor from './ImageCompressor';
import Navbar from '../navbar/navbar';

const Compress = () => {
  const [compressedImage, setCompressedImage] = useState(null);

  const handleImageCompression = (compressedBlob) => {
    const compressedImageUrl = URL.createObjectURL(compressedBlob);
    setCompressedImage(compressedImageUrl);
  };

  return (
    <div>
      <Navbar />
      <h1>Image Compression App</h1>
      <ImageCompressor handleCompression={handleImageCompression} />
      {compressedImage && (
        <div className="image-preview">
          <h2>Compressed Image</h2>
          <img src={compressedImage} alt="Compressed" />
          <a href={compressedImage} download="compressed_image.jpg">
            Save Image
          </a>
        </div>
      )}
    </div>
  );
};

export default Compress;
