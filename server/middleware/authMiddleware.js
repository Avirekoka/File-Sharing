import jwt from "jsonwebtoken";
import 'dotenv/config'

const authMiddleware = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
        
        const decodedData = jwt.verify(token, process.env.SECRET_KEY);
  
        req.userId = decodedData?.id;
        
        next();
    } catch (error) {
      res.status(404).json({error: "Please login"});
    }
  };
  
  export default authMiddleware;