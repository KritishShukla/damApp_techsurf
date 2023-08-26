import React from 'react';

function ImageUploader({ onFileSelected }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileSelected(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}

export default ImageUploader;
