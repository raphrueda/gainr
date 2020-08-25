import { Router } from 'express';

import { auth } from './auth/auth.route';

const router = Router();

router.use('/auth', auth);

export const baseRouter = router;
