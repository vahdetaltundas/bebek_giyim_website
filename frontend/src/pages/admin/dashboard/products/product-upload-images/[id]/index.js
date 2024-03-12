import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

const UploadImages = () => {
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);

  const handleFileChange = (event, index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = event.target.files[0];
    setSelectedFiles(newSelectedFiles);
  };

  const handleUpload = () => {
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      if (file) {
        formData.append(`images`, file);
      }
    });

    // Yetkilendirme tokeni
    const token = Cookies.get("adminToken");

    // API isteği için başlık oluştur
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.post('http://localhost:3001/api/upload/27', formData, config)
      .then(response => {
        console.log('Files uploaded successfully:', response.data);
      })
      .catch(error => {
        console.error('Error uploading files:', error);
      });
  };

  return (
    <div>
      {[0, 1, 2].map((index) => (
        <div key={index}>
          <input type="file" onChange={(e) => handleFileChange(e, index)} />
        </div>
      ))}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadImages;
