import File from '../models/fileHandlingModel.js';
import fs from 'fs';

export const uploadFile = async (req,res) => {
    try {
        const {filename, path, originalname} = req.file;
        const {password, user} = req.body;

        if(!req.file) return res.status(404).json({error: "Please upload file"});

        const createFileData = {
            fileName:filename,
            fileStoredPath: path,
            originalFileName: originalname,
            user: user
        }

        if(password){
            createFileData.password = password;
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
        
        const {password} = req.body;

        const id = req.params.file_id;

        const fileData = await File.findById(id);

        if(fileData.password){
            if(!password) return res.status(404).json({error: "Please enter the password"});
        }

        if(fileData.password === password){

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
            console.log("Deleted from disk")
        } catch(err) {
        console.error(err)
        }

        res.json({ message: `Successfully deleted : ${id}` });


    } catch (error) {
        res.status(500).json({error});
        console.log(`Error... : ${error}`);
    }
}