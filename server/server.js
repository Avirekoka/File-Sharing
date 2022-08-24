import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from './routes/userRoute.js';
import fileRoute from './routes/fileHandlingRoute.js';
import 'dotenv/config'

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Authentication route
app.use('/', userRoute);
app.use('/file', fileRoute);

//Database connection
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;
mongoose.connect(DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
.catch((error) => console.log(`${error}`));
