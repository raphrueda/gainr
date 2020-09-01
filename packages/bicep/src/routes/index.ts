import { Router } from 'express';
import { verify } from 'jsonwebtoken';

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

        // TODO: Duplicated route logic. Abstract into utils
        if (!process.env?.ACCESS_TOKEN_SECRET) {
            console.error('Missing access secret.');
            throw new Error('Something went wrong.');
        }

        try {
            const token = authToken.split(' ')[1];
            const payload = verify(token, process.env.ACCESS_TOKEN_SECRET) as Record<string, any>;
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
