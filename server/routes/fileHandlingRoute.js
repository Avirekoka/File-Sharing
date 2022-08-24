import express from 'express';
import {uploadFile, downloadFile, getAllFiles, deleteFile} from '../controllers/fileHandlingControllers.js'
import multer from "multer";
import authMiddleware from '../middleware/authMiddleware.js';

// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //Appending extension
    }
  })
  
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), uploadFile); 
router.get('/getAllFiles/:id', authMiddleware, getAllFiles);
router.post('/download/:file_id', downloadFile);
router.delete('/deleteFile/:file_id',  deleteFile);

export default router;