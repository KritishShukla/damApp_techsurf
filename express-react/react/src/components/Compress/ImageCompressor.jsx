import React, { useState } from 'react';
import Compressor from 'compressorjs';
import './ImageCompressor.css';

function ImageCompressor({ file }) {
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionQuality, setCompressionQuality] = useState(0.8);

  const compressImage = () => {
    new Compressor(file, {
      quality: compressionQuality,
      maxWidth: 800,
      success(result) {
        const compressedImageUrl = URL.createObjectURL(result);
        setCompressedImage(compressedImageUrl);
      },
      error(err) {
        console.error('Compression error:', err.message);
      },
    });
  };

  
  

  return (
    <div className="image-compressor">
      {file && (
        <div className="image-preview">
          <h2>Original Image</h2>
          <img className="original-image" src={URL.createObjectURL(file)} alt="Original" />
        </div>
      )}
      {compressedImage && (
        <div className="image-preview">
          <h2>Compressed Image</h2>
          <img src={compressedImage} alt="Compressed" />
          <a href={compressedImage} download="compressed_image.jpg">
            save image
          </a>
        </div>
      )}
      {file && !compressedImage && (
        <div className="compression-options">
          <button onClick={compressImage}>Compress</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={compressionQuality}
            onChange={(e) => setCompressionQuality(parseFloat(e.target.value))}
          />
          <span>Compression Quality: {compressionQuality}</span>
        </div>
      )}
    </div>
  );
}

export default ImageCompressor;
