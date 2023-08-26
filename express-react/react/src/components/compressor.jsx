import React, { useState } from 'react';
import ImageUploader from './Compress/ImageUploader';
import ImageCompressor from './Compress/ImageCompressor';
import Navbar from './navbar/navbar';
const  Compress=()=> {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };

  return (
    <div>
      <Navbar/>
      <h1>Image Compression App</h1>
      <ImageUploader onFileSelected={handleFileSelected} />
      {selectedFile && <ImageCompressor file={selectedFile} />}
    </div>
  );
}

export default Compress;
