import multer from "multer";

//creating storage configuration
//multer.diskStorage() creates a storage object with given configuration
//destination is the folder where the files will be stored


const storage = multer.memoryStorage(); // Change to memoryStorage

const upload = multer({ storage });

export default upload;
