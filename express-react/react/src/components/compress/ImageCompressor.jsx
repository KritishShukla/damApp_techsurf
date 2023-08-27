import React, { useState } from 'react';
import Compressor from 'compressorjs';
import './ImageCompressor.css';

function ImageCompressor({ handleCompression }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressionQuality, setCompressionQuality] = useState(0.8);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    compressImage(file);
  };

  const compressImage = (file) => {
    new Compressor(file, {
      quality: compressionQuality,
      maxWidth: 800,
      success(result) {
        handleCompression(result);
      },
      error(err) {
        console.error('Compression error:', err.message);
      },
    });
  };

  return (
    <div className="image-compressor">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {/* Rest of your component JSX */}
    </div>
  );
}

export default ImageCompressor;
