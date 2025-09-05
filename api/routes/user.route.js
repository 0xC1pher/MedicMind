import express from 'express';
import {getUserByAadharCard,test} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/',test)

router.get('/:aadharID',getUserByAadharCard) // made changes so to take data based on aadharID

export default router;
