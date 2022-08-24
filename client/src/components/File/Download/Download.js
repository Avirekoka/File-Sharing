import React, { useState } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { useParams } from "react-router-dom";
import './download.css';

function Download() {

    const params = useParams();

    const [code, setPassword] = useState('');

    const handleDownload = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:5000/file/download/${params.id}`, {
            headers: {
                'Accept': 'application/pdf',
              },
              responseType: 'blob',
              code
            })
        .then(response => {
            if(response.status === 200){
                fileDownload(response.data, `${params.id}.txt`)       
            }  
        }).catch(error => alert("Something went wrong"));

        setPassword('');

    }
    return (
            <form autoComplete="off" onSubmit={(e) => handleDownload(e)} className="download-form">
                <h1>Download File Here</h1>
                <div className='form-control'>
                    <input type="password" value = {code} placeholder="Please enter the file password..." onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                
                <button>Donwload</button>
            </form>
    )
}

export default Download