import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

import { SchemaValidationError } from '../errors/route.errors';

export const validate = (schema: ObjectSchema): RequestHandler => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        next(new SchemaValidationError(error));
    }
    next();
};
