import express from 'express';
import { Article } from '../models/article.js';
import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import 'dotenv/config'


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const storage = new  CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'article-images',
    format: async (req, file) => 'png',
    public_id: (req, file) => 'image-' + Date.now(),
  },
});

const router = express.Router();

const upload = multer({ storage: storage });



router.post('/', upload.single('image'), async (req, res) => {
  const articleData = req.body;

  console.log(req.body,'dtata')

  if (req.file) {
    articleData.image = req.file.secure_url;
  } else {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const article = new Article(articleData);
  
  try {
    await article.save();
    res.status(201).json(article); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
    

  // List all articles
router.get('/', async (req, res) => {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (err) {
      res.status(500).send(err);
    }
  });


 
  
// Edit an article
router.put('/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
      const article = await Article.findByIdAndUpdate(articleId, req.body, { new: true });
      res.json(article);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  // Remove an article
router.delete('/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
      await Article.findByIdAndRemove(articleId);
      res.status(204).send();
    } catch (err) {
      res.status(404).send(err);
    }
  });
  

  export default router;