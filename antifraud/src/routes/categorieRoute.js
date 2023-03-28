import express from 'express';
import categoryController from '../controllers/categorieControlle.js';

const router = express.Router();

router
  .post('/v1/analise/client/', categoryController.checkCategories)
  .get('/v1/em-analise/', categoryController.listOfCategories);
export default router;
