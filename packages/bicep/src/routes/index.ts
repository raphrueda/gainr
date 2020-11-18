import { Router } from 'express';

import { auth } from './auth/auth.route';
import { requireAuth } from './route.utils';

const router = Router();

// Test route
router.get('/', (_req, res) => res.send('Yay'));
// Protected
router.get('/supersecret', requireAuth, (req, res) =>
    res.send(`You've accessed the super secret route, user ${res.locals.userId}`),
);

router.use('/auth', auth);

export const baseRouter = router;
