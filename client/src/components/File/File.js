import React from 'react';
import axios from 'axios';
import './file.css';

function File({files}) {
 
  const handleDelete = async(file_id) => {
    if(window.confirm("Delete the item?")){
    await axios.delete(`http://localhost:5000/file/deleteFile/${file_id}`)
      .then(response => {
          if(response.status === 200){
              alert("Deleted successfully...");
          }  
      }).catch(() => alert("Something went wrong"));
    }
  }

  return (
    <div>
      {
        files.length !== 0 ? files.map(file => {
          return(
            <div key={file._id} className="file">
              <h2>{file.originalFileName}</h2>
              <button onClick={() => {navigator.clipboard.writeText(`http://localhost:3000/download/${file._id}`)}}  className="copy-button">Copy Link</button>
              <button onClick={() => handleDelete(file._id)} className="delete-button">Delete</button>
            </div>
          )
        }) : <h2 className="no-file-text">Please upload file</h2>
      }
    </div>
  )
}

export default File