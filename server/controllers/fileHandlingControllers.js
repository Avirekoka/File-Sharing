import File from '../models/fileHandlingModel.js';
import fs from 'fs';
import { error } from 'console';

export const uploadFile = async (req,res) => {
    try {
        const {filename, path, originalname} = req.file;
        const {user} = req.body;

        if(!req.file) return res.status(404).json({error: "Please upload file"});

        const createFileData = {
            fileName:filename,
            fileStoredPath: path,
            originalFileName: originalname,
            user: user,
            code: 100000 + Math.floor(Math.random() * 900000)
        }

        const fileData = await File.create(createFileData);

        res.json({ message: "Successfully uploaded files", data: fileData });
        
    } catch (error) {
        res.status(500).json({error: error});
        console.log(`Error... : ${error}`);
    }
} 

export const downloadFile = async (req,res) => { 
    try {
        
        const {code} = req.body;

        const id = req.params.file_id;

        const fileData = await File.findById(id);

        if(fileData.code){
            if(!code) return res.status(404).json({error: "Please enter the password"});
        }

        if(fileData.code === code){

            res.download(fileData.fileStoredPath, fileData.fileName);
        }else{
            return res.status(404).json({error: "Enter the correct password"});
        }

    } catch (error) {
        res.status(500).json({error});
        console.log(`Error... : ${error}`);
    }
}

export const getAllFiles = async (req,res) => {
    try {

        const {id} = req.params;
        
        const fileData = await File.find({user : id});


        res.json({ message: `Successfully fetch all the files of : ${id}`, data: fileData });


    } catch (error) {
        res.status(500).json({error});
        console.log(`Error... : ${error}`);
    }
}

export const deleteFile = async (req,res) => {
    try {

        const id = req.params.file_id;

        const fileData = await File.findById(id);

        await File.deleteOne({_id: id});

        console.log(fileData)
        try {
            fs.unlinkSync(fileData.fileStoredPath);
        } catch(error ){
            console.log(error)
        }

        res.json({ message: `Successfully deleted : ${id}` });


    } catch (error) {
        res.status(500).json({error});
        console.log(`Error... : ${error}`);
    }
}