import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import { getEnvVar } from 'src/utils/common';

import { auth } from './auth/auth.route';

const router = Router();

// Test route
router.get('/', (_req, res) => res.send('Yay'));
// Protected
router.get(
    '/supersecret',
    (req, res, next) => {
        const authToken = req.headers['authorization'];

        if (!authToken) {
            throw new Error('Missing authorization token');
        }

        const accessTokenSecret = getEnvVar('ACCESS_TOKEN_SECRET');

        try {
            const token = authToken.split(' ')[1];
            const payload = verify(token, accessTokenSecret) as Record<string, any>;
            res.locals.userId = payload.userId;
        } catch (error) {
            throw new Error('Bad token.');
        }
        return next();
    },
    (req, res) => res.send(`You've accessed the super secret route, user ${res.locals.userId}`),
);

router.use('/auth', auth);

export const baseRouter = router;
