import express from 'express';
import { Category } from '../models/category.js';

const router = express.Router();


 // Create a new category
 router.post('/', async (req, res) => {
    const category = new Category(req.body);
    try {
      await category.save();
      res.json(category);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  // List all categories
router.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  export default router;
