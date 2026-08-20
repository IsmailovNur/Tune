import multer from 'multer';
import path from 'path';
import config from "./config";
import { promises as fs } from 'fs';

const imageStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, {recursive: true});
    cb(null, destDir);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, crypto.randomUUID() + extension);
  },
});

export const upload = multer({storage: imageStorage});