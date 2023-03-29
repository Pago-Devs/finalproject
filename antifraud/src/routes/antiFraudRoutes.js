import express from 'express';
import passport from 'passport';
import antiFraudController from '../controllers/antiFraudController.js';

const router = express.Router();
const authenticateLocal = passport.authenticate('local', { session: false });

router
  .post('/v1/analysis/login', authenticateLocal, antiFraudController.login)
  .post('/v1/analysis/', antiFraudController.createAnalysis)
  .get('/v1/analysis/all', antiFraudController.listAnalysis)
  .get('/v1/analysis/dataclient/:id', antiFraudController.getDataClient)
  .post('/v1/analysis/updatestatus', antiFraudController.updateAnalysis);

export default router;
