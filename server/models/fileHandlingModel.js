import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    originalFileName: {
        type: String,
        required: true,
    },
    fileStoredPath: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
});

const File = mongoose.model("File", FileSchema);

export default File; 