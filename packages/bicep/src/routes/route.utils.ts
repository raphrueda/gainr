import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

import { getEnvVar } from '@utils/common';

import { SchemaValidationError } from './route.errors';
import { verify } from 'jsonwebtoken';

export const validate = (schema: ObjectSchema): RequestHandler => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        next(new SchemaValidationError(error));
    }
    next();
};

export const requireAuth: RequestHandler = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (!authToken) {
        return next(new Error('Missing authorization token'));
    }

    try {
        const token = authToken.split(' ')[0];
        const payload = verify(token, getEnvVar('ACCESS_TOKEN_SECRET')) as Record<string, any>;
        res.locals.userId = payload.userId;
    } catch (error) {
        return next(new Error('Bad token.'));
    }
    return next();
};
