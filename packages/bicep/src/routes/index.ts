import { Router } from 'express';

import { auth } from './auth/auth.route';

const router = Router();

// Test route
router.get('/', (_req, res) => res.send('Yay'));

router.use('/auth', auth);

export const baseRouter = router;
