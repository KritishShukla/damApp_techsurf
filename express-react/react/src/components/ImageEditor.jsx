import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
// import { getCroppedImg } from './utils'; 

function ImageEditor({ location }) {
  const imageUrl = location?.state?.imageUrl;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleCropComplete = async (_, croppedAreaPixels) => {
    // const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
    // setCroppedImage(croppedImage);
  };

  const handleSave = () => {
    // You can send the cropped image to your server or perform other actions
    // For demonstration purposes, let's just log the data URL
    console.log(croppedImage);
  };

  return (
    <div>
      <h1>Image Editor</h1>
      <div>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>
      {croppedImage && (
        <div>
          <h2>Preview</h2>
          <img src={croppedImage} alt="Cropped" />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default ImageEditor;
