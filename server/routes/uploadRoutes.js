import express from 'express';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// Ensure that the "uploads" directory exists
const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File filter function to restrict file types
function fileFilter(req, file, cb) {
  // Allowed file types
  const filetypes = /jpe?g|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Allowed types: jpg, jpeg, png, webp'), false);
  }
}

// Multer configuration with storage and file filter
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

// Route for handling file uploads
router.post('/', (req, res) => {
  // Handling file upload using middleware
  uploadSingleImage(req, res, function (err) {
    if (err) {
      // Sending an error response if upload fails
      return res.status(400).send({ message: err.message });
    }

    // Constructing the correct path for the uploaded image
    const imagePath = req.file.path.replace(/\\/g, '/');
    
    // Sending a success response with the corrected path to the uploaded image
    res.status(200).send({
      message: 'Successfully uploaded',
      image: `/${imagePath}`,
    });
  });
});

export default router;
