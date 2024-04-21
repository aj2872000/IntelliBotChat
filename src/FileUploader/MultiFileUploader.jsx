import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MultiFileUploader.css'; 

const MultiFileUploader = ({handleFilePaths}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        // Handle response from server
        console.log(response.data);
        handleFilePaths(response.data.filePaths)
      })
      .catch(error => {
        // Handle error
        console.error('Error uploading files:', error);
      });
  };

  useEffect(()=>{
    handleUpload()
  },[selectedFiles])
  return (
    <div className="multi-file-uploader">
      <input
        type="file"
        onChange={handleFileSelect}
        multiple
        className="file-input"
      />
      {/* <h3 className="selected-files-header">Selected Files:</h3>
      <ul className="file-list">
        {selectedFiles.map((file, index) => (
          <li key={index} className="file-item">{file.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default MultiFileUploader;
