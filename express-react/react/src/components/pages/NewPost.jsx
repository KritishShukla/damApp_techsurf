import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [selectedFileName, setSelectedFileName] = useState(""); // State to hold selected file name

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("caption", caption);

    try {
      await axios.post("http://13.48.94.31:8080/api/posts", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
    navigate("/");
  };

  const fileSelected = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setSelectedFileName(selectedFile.name); // Update selected file name
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={submit}
        style={{ width: 400 }}
        className="bg-white p-8 rounded shadow-md space-y-4"
      >
        <div className="relative">
          <input
            onChange={fileSelected}
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            id="file-input"
          />
          <label
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            htmlFor="file-input"
          >
            Select Image
          </label>
          <span className="ml-2">{selectedFileName}</span> {/* Display selected file name */}
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter a catchy title"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          placeholder="Write a caption"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
