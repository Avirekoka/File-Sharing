import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import File from '../File/File';
import './home.css';

function Home() {

  const userToken = localStorage.getItem('userToken');
  const userId = localStorage.getItem("user_id");
  const [files,setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  //get all files
  const getAllFiles = async() => {
    await axios.get(`http://localhost:5000/file/getAllFiles/${userId}`, {
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken
      },
      }).then((response) => {
        if(response.status === 200){
          setFiles(response.data.data);
        }
      }).catch(error => console.log(error));

  };

  //Handle Upload file
  const handleUpload = async(e) => {
    e.preventDefault();
		const formData = new FormData();

		formData.append('file', selectedFile);
    formData.append('user', userId);
    formData.append('password', password);

    await axios.post(`http://localhost:5000/file/upload`,formData, {
        headers: {
          'Accept': 'application/pdf',
          "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer ' + userToken
        }
        }).then(response => {
          if(response.status === 200){
              console.log(response)    
          }  
    }).catch(error => console.log(error));

    setPassword('');

	};

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  useEffect(() => {
    if(userToken === null){
      navigate('/login');
    }
  },[]);

  useEffect(() => {
    getAllFiles();
  }, [userToken, password]);

  const handleLogout = (e) => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <div className='header'>
        <h1>Share your files</h1>
        <button onClick={(e) => handleLogout(e)}>Logout</button>
      </div>
      <div>
        <h1 className="upload-heading">Upload File</h1>
        <form onSubmit={(e) => handleUpload(e)} className="upload-form">
          <input required type="file" id="file" name="file" onChange={changeHandler}/>
          <input required type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter the password of file..."/>
          <button>Upload File</button>
        </form>
      </div>
      <File files={files} userToken={userToken} />
    </div>

  )
}

export default Home