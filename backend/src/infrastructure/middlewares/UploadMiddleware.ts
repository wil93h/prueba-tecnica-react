import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOADS_DIR || 'uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

export const uploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    allowedTypes.includes(file.mimetype) 
      ? cb(null, true)
      : cb(new Error('INVALID_FILE_TYPE'));
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});