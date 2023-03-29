import express from 'express';
import antiFraudController from '../controllers/antiFraudController.js';

const router = express.Router();

router
  .post('/v1/analysis/', antiFraudController.createAnalysis)
  .get('/v1/analysis/all', antiFraudController.listAnalysis)
  .get('/v1/analysis/dataclient/:id', antiFraudController.getDataClient)
  .post('/v1/analysis/updatestatus', antiFraudController.updateAnalysis);

export default router;
